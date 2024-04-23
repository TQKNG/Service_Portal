import React, { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const ClassroomFormStudents = ({
  studentsList,
  setFormData,
  formData,
  edit,
  setAlert,
}) => {
  const [studentItems, setStudentItems] = useState(
    studentsList.length > 0 && !edit ? [-1] : [],
  );

  const removeItem = (arr, id) => {
    let array = [];
    for (let i = 0; i < arr.length; i++) {
      if (i !== id) {
        array.push(arr[i]);
      }
    }
    setFormData({ ...formData, Students: array });
    setStudentItems(array);
  };

  return (
    <div>
      <label for='Groups'>
        <b>Students</b>
      </label>
      {studentItems.map((item, id) => {
        return (
          <div className='d-flex mb-3' key={id}>
            <Typeahead
              className='w-100'
              id='students-list'
              disabled={edit}
              //defaultSelected={studentsList.slice(0, 1)}
              labelKey={(option) =>
                `${option.FirstName} ${option.LastName}${
                  option.AlternativeID !== null
                    ? ` - ${option.AlternativeID}`
                    : ''
                }`
              }
              onInputChange={(text, e) => {
                console.log(text);
              }}
              onChange={(e) => {
                console.log(e);
                if (e.length > 0) {
                  setFormData({
                    ...formData,
                    Students: [
                      ...studentItems.slice(0, id),
                      parseInt(e[0].UserID),
                      ...studentItems.slice(id + 1),
                    ],
                  });
                  setStudentItems([
                    ...studentItems.slice(0, id),
                    parseInt(e[0].UserID),
                    ...studentItems.slice(id + 1),
                  ]);
                } else {
                  setFormData({
                    ...formData,
                    Students: [
                      ...studentItems.slice(0, id),
                      -1,
                      ...studentItems.slice(id + 1),
                    ],
                  });
                  setStudentItems([
                    ...studentItems.slice(0, id),
                    -1,
                    ...studentItems.slice(id + 1),
                  ]);
                }
              }}
              options={studentsList}
              placeholder='Select a Student'
            />
            {/* <select
              className='form-select'
              aria-label='Default select example'
              id='Students'
              disabled={edit}
              value={item}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  Students: [
                    ...studentItems.slice(0, id),
                    parseInt(e.target.value),
                    ...studentItems.slice(id + 1),
                  ],
                });
                setStudentItems([
                  ...studentItems.slice(0, id),
                  parseInt(e.target.value),
                  ...studentItems.slice(id + 1),
                ]);
              }}
            >
              <option key={12131234} value={-1}>
                Please Select a student
              </option>
              {studentsList.map((student) => {
                return (
                  <option key={student.UserID} value={student.UserID}>
                    {student.FirstName + ' ' + student.LastName}
                  </option>
                );
              })}
            </select>*/}
            {!edit && (
              <div className='d-flex  w-20'>
                {id === studentItems.length - 1 && (
                  <div
                    className='align-self-end mx-1'
                    onClick={() => {
                      if (studentItems.indexOf(-1) === -1) {
                        setFormData({
                          ...formData,
                          Students: [...studentItems, -1],
                        });
                        setStudentItems([...studentItems, -1]);
                        console.log(studentItems);
                      } else {
                        setAlert('Please add a proper Student', 'danger');
                      }
                    }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='37.6'
                      height='37.6'
                      fill='currentColor'
                      class='bi bi-plus add-item-btn rounded-circle border border-primary txt-primary border-2'
                      viewBox='0 0 16 16'
                    >
                      <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z' />
                    </svg>
                  </div>
                )}
                {studentItems.length > 1 && (
                  <div
                    className={`align-self-end ${
                      id === studentItems.length - 1 ? 'mx-2' : 'mx-1'
                    }`}
                    onClick={() => {
                      removeItem(studentItems, id);
                    }}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='37.6'
                      height='37.6'
                      fill='currentColor'
                      class='bi bi-trash delete-item-btn rounded-circle border  border-2 p-2'
                      viewBox='0 0 16 16'
                    >
                      <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                      <path
                        fill-rule='evenodd'
                        d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                      />
                    </svg>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
      {studentItems.length > 1 && (
        <div className='d-flex justify-content-end'>
          <button
            className='btn button-primary'
            onClick={() => {
              setStudentItems([studentsList[0].UserID]);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ClassroomFormStudents;
