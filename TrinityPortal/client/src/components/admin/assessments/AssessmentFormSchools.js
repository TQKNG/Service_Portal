import React, { useState } from 'react';

const AssessmentFormSchools = ({ schoolsList, setFormData, formData }) => {
  const [schoolItems, setSchoolItems] = useState([schoolsList[0].SchoolID]);

  const removeItem = (arr, id) => {
    let array = [];
    for (let i = 0; i < arr.length; i++) {
      if (i !== id) {
        array.push(arr[i]);
      }
    }
    setFormData({ ...formData, SchoolsID: array });
    setSchoolItems(array);
  };

  return (
    <div>
      <label for='Groups'>
        <b>Schools</b>
      </label>
      {schoolItems.map((item, id) => {
        return (
          <div className='d-flex mb-1' key={id}>
            <select
              className='form-select'
              aria-label='Default select example'
              id='Schools'
              value={schoolItems[id]}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  SchoolsID: [
                    ...schoolItems.slice(0, id),
                    parseInt(e.target.value),
                    ...schoolItems.slice(id + 1),
                  ],
                });
                setSchoolItems([
                  ...schoolItems.slice(0, id),
                  parseInt(e.target.value),
                  ...schoolItems.slice(id + 1),
                ]);
              }}
            >
              {schoolsList.map((school) => {
                return (
                  <option key={school.SchoolID} value={school.SchoolID}>
                    {school.Name}
                  </option>
                );
              })}
            </select>
            <div className='d-flex w-20'>
              {id === schoolItems.length - 1 && (
                <div
                  className='align-self-end mx-1'
                  onClick={() => {
                    setFormData({
                      ...formData,
                      SchoolsID: [...schoolItems, schoolsList[0].SchoolID],
                    });
                    setSchoolItems([...schoolItems, schoolsList[0].SchoolID]);
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
              {schoolItems.length > 1 && (
                <div
                  className={`align-self-end ${
                    id === schoolItems.length - 1 ? 'mx-2' : 'mx-1'
                  }`}
                  onClick={() => {
                    removeItem(schoolItems, id);
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
          </div>
        );
      })}
      {schoolItems.length > 1 && (
        <div className='d-flex justify-content-end'>
          <button
            className='btn button-primary'
            onClick={() => {
              setSchoolItems([schoolsList[0].SchoolID]);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default AssessmentFormSchools;
