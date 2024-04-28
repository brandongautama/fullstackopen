const Filter = ({ searchFilter, handleSearchFilter }) => (
  <div>
    <label>filter shown with </label>
    <input value={searchFilter} onChange={handleSearchFilter} />
  </div>
);

export default Filter;
