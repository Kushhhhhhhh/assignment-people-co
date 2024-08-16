"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { faker } from "@faker-js/faker";
import UserDetailsDialog from "@/components/UserDetailsDialog";
import AddOrUpdateMemberDialog from "@/components/AddOrUpdateMemberDialog";
import EditUserDialog from "@/components/EditUserDialog";
import FilterDialog from "@/components/FilterDialog";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { CiFilter } from "react-icons/ci";
import useDebounce from "@/components/UseDebounce";

const generateData = (numRows) => {
  const teams = ["Engineering", "Marketing", "Sales"];
  return Array.from({ length: numRows }, (_, i) => ({
    id: i,
    name: faker.person.fullName(),
    status: faker.helpers.arrayElement(["Active", "Inactive"]),
    role: faker.person.jobTitle(),
    email: faker.internet.email(),
    team: teams[i % teams.length],
    avatar: faker.image.avatar(),
    dob: faker.date.birthdate().toLocaleDateString(),
    gender: faker.helpers.arrayElement(["Male", "Female"]),
    nationality: faker.location.country(),
    contact: faker.phone.number(),
    workAddress: faker.location.streetAddress(),
    research: faker.lorem.sentence(),
    publications: faker.lorem.sentence(),
  }));
};

const PeopleDirectory = () => {
  const [tableData, setTableData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUserDetailsDialogOpen, setIsUserDetailsDialogOpen] = useState(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false);

  // Debounced search term
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Memoize filtered data
  const filteredData = useMemo(() => {
    // Ensure debouncedSearchTerm is a string
    const debouncedSearchTermStr = typeof debouncedSearchTerm === 'string' ? debouncedSearchTerm : '';
    return tableData.filter((user) => {
      const matchesSearch = user.name
        .toLowerCase()
        .includes(debouncedSearchTermStr.toLowerCase());
      const matchesFilter = filter ? user.team === filter : true;
      return matchesSearch && matchesFilter;
    });
  }, [tableData, debouncedSearchTerm, filter]);

  const updateUrlParams = () => {
    const urlQuery = new URLSearchParams();
    urlQuery.set("query", searchTerm);
    urlQuery.set("filter", filter);
    window.history.pushState({}, "", `${window.location.pathname}?${urlQuery.toString()}`);
  };

  useEffect(() => {
    const data = generateData(50);
    setTableData(data);

    const urlQuery = new URLSearchParams(window.location.search);
    setSearchTerm(urlQuery.get("query") || "");
    setFilter(urlQuery.get("filter") || "");
  }, []);

  useEffect(() => {
    updateUrlParams();
  }, [searchTerm, filter]);

  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("avatar", {
        header: "Avatar",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
            onClick={() => handleOpenUserDetailsDialog(info.row.original)}
          />
        ),
      }),
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => (
          <span
            className="font-medium text-gray-800 cursor-pointer"
            onClick={() => handleOpenUserDetailsDialog(info.row.original)}
          >
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              info.getValue() === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            } hidden md:table-cell`}
          >
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: (info) => (
          <span className="text-gray-600 hidden md:table-cell">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => (
          <span className="text-gray-600 hidden md:table-cell">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("team", {
        header: "Team",
        cell: (info) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${
              info.getValue() === "Engineering"
                ? "bg-blue-100 text-blue-800"
                : info.getValue() === "Marketing"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-purple-100 text-purple-800"
            } hidden md:table-cell`}
          >
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("actions", {
        header: "Actions",
        cell: (info) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleOpenEditUserDialog(info.row.original)}
              className="text-blue-500 hover:text-blue-700"
            >
              <MdOutlineEdit />
            </button>
            <button
              onClick={() => handleDeleteUser(info.row.original.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaRegTrashCan />
            </button>
          </div>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    pageCount: Math.ceil(filteredData.length / pageSize),
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleOpenUserDetailsDialog = (user) => {
    setSelectedUser(user);
    setIsUserDetailsDialogOpen(true);
  };

  const handleCloseUserDetailsDialog = () => {
    setIsUserDetailsDialogOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId) => {
    setTableData((prevData) => prevData.filter((user) => user.id !== userId));
  };

  const handleOpenEditUserDialog = (user) => {
    setSelectedUser(user);
    setIsEditUserDialogOpen(true);
  };

  const handleCloseEditUserDialog = () => {
    setIsEditUserDialogOpen(false);
    setSelectedUser(null);
  };

  const handleSaveEditedUser = (updatedUser) => {
    setTableData((prevData) =>
      prevData.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    handleCloseEditUserDialog();
  };

  const handleOpenAddMemberDialog = () => {
    setIsAddMemberDialogOpen(true);
  };

  const handleCloseAddMemberDialog = () => {
    setIsAddMemberDialogOpen(false);
  };

  const handleSaveNewMember = (newMember) => {
    setTableData((prevData) => [...prevData, newMember]);
    handleCloseAddMemberDialog();
  };

  const handleOpenFilterDialog = () => {
    setIsFilterDialogOpen(true);
  };

  const handleCloseFilterDialog = () => {
    setIsFilterDialogOpen(false);
  };

  const handleFilterChange = (team) => {
    setFilter(team);
    handleCloseFilterDialog();
  };

  return (
    <div className="p-4 md:p-6 shadow-lg rounded-xl min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Team Members
          <span className="text-lg font-normal text-purple-600 bg-gray-300 rounded-full ml-4 p-2">
            {tableData.length} users
          </span>
        </h1>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
          />
          <button
            onClick={handleOpenFilterDialog}
            className="px-4 py-2 text-2xl"
          >
            <CiFilter />
          </button>
          <button
            onClick={handleOpenAddMemberDialog}
            className="px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600"
          >
            + Add Member
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 border-b border-gray-200 text-left text-gray-600 font-medium"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 border-b border-gray-200 text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-600">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>

      {isUserDetailsDialogOpen && (
        <UserDetailsDialog
          user={selectedUser}
          onClose={handleCloseUserDetailsDialog}
        />
      )}
      {isAddMemberDialogOpen && (
        <AddOrUpdateMemberDialog
          onSave={handleSaveNewMember}
          onClose={handleCloseAddMemberDialog}
        />
      )}
      {isEditUserDialogOpen && (
        <EditUserDialog
          isOpen={isEditUserDialogOpen}
          user={selectedUser}
          onSave={handleSaveEditedUser}
          onClose={handleCloseEditUserDialog}
        />
      )}
      {isFilterDialogOpen && (
        <FilterDialog
          isOpen={isFilterDialogOpen}
          onClose={handleCloseFilterDialog}
          onFilterChange={handleFilterChange}
        />
      )}
    </div>
  );
};

export default PeopleDirectory;