import Dropdown from "react-bootstrap/Dropdown";

const SortDropdown = ({ active, onSort }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="transparent"
        id="sort-dropdown"
        className="border color-main-black"
      >
        <span className="text-secondary">Sort By: </span>
        {active === 1
          ? "Price, Low to Hight"
          : active === -1
          ? "Price, High to Low"
          : "default"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onSort(0)}>Default</Dropdown.Item>
        <Dropdown.Item onClick={() => onSort(1)}>
          Price, Low to High
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onSort(-1)}>
          Price, High to Low
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortDropdown;
