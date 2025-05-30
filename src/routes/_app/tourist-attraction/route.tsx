import Table from "@/components/table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/tourist-attraction")({
  component: RouteComponent,
});

const generateVenueData = () => {
  const venues = [
    {
      id: 1,
      name: "Kontiki Park & Resort",
      category: "Leisure/Entertainment",
      address: "Kontiki Park & Resort",
      lastUpdated: "25th May, 2025",
    },
    {
      id: 2,
      name: "Oxbow Lake",
      category: "Culture/Nature",
      address: "Oxbow Lake",
      lastUpdated: "5th May, 2025",
    },
    {
      id: 3,
      name: "De Gracious Event Centre",
      category: "Entertainment",
      address: "De Gracious Event Centre",
      lastUpdated: "16th April, 2025",
    },
    {
      id: 4,
      name: "De Moon",
      category: "Entertainment",
      address: "DE MOON",
      lastUpdated: "5th April, 2025",
    },
    {
      id: 5,
      name: "64 LOUNGE",
      category: "Entertainment",
      address: "64 LOUNGE",
      lastUpdated: "13th July, 2025",
    },
    {
      id: 6,
      name: "Golden Tulip Hotel",
      category: "Leisure/Entertainment",
      address: "Golden Tulip Hotel, Airport Road",
      lastUpdated: "2nd March, 2025",
    },
    {
      id: 7,
      name: "La Palm Royal Beach Hotel",
      category: "Leisure/Entertainment",
      address: "La Palm Royal Beach Hotel",
      lastUpdated: "15th June, 2025",
    },
    {
      id: 8,
      name: "Labadi Beach Hotel",
      category: "Leisure/Entertainment",
      address: "Labadi Beach Hotel, La",
      lastUpdated: "8th February, 2025",
    },
    {
      id: 9,
      name: "National Theatre",
      category: "Culture/Nature",
      address: "National Theatre of Ghana",
      lastUpdated: "22nd January, 2025",
    },
    {
      id: 10,
      name: "Akosombo Continental Hotel",
      category: "Leisure/Entertainment",
      address: "Akosombo Continental Hotel",
      lastUpdated: "12th August, 2025",
    },
    {
      id: 11,
      name: "Cape Coast Castle",
      category: "Culture/Nature",
      address: "Cape Coast Castle",
      lastUpdated: "30th September, 2025",
    },
    {
      id: 12,
      name: "Kakum National Park",
      category: "Culture/Nature",
      address: "Kakum National Park, Central Region",
      lastUpdated: "18th October, 2025",
    },
    {
      id: 13,
      name: "Republic Bar & Grill",
      category: "Entertainment",
      address: "Republic Bar & Grill, East Legon",
      lastUpdated: "7th November, 2025",
    },
    {
      id: 14,
      name: "Twist Nightclub",
      category: "Entertainment",
      address: "Twist Nightclub, Osu",
      lastUpdated: "14th December, 2025",
    },
    {
      id: 15,
      name: "Elmina Beach Resort",
      category: "Leisure/Entertainment",
      address: "Elmina Beach Resort",
      lastUpdated: "3rd January, 2025",
    },
    {
      id: 16,
      name: "W.E.B. DuBois Centre",
      category: "Culture/Nature",
      address: "W.E.B. DuBois Centre, Cantonments",
      lastUpdated: "25th February, 2025",
    },
    {
      id: 17,
      name: "Mole National Park",
      category: "Culture/Nature",
      address: "Mole National Park, Northern Region",
      lastUpdated: "11th April, 2025",
    },
    {
      id: 18,
      name: "SkyBar 25",
      category: "Entertainment",
      address: "SkyBar 25, Labadi",
      lastUpdated: "19th May, 2025",
    },
    {
      id: 19,
      name: "Movenpick Ambassador Hotel",
      category: "Leisure/Entertainment",
      address: "Movenpick Ambassador Hotel, Airport City",
      lastUpdated: "6th June, 2025",
    },
    {
      id: 20,
      name: "Independence Square",
      category: "Culture/Nature",
      address: "Independence Square, Osu",
      lastUpdated: "23rd July, 2025",
    },
  ];

  return venues;
};

const ActionButtons = ({
  onEdit,
  onDelete,
  editText = "Edit",
  deleteText = "Delete",
}: {
  onEdit: () => void;
  onDelete: () => void;
  editText?: string;
  deleteText?: string;
}) => {
  return (
    <div className="font-inter flex items-center space-x-2">
      <button
        onClick={onEdit}
        className="px-5 py-2 bg-green-600 cursor-pointer text-white text-sm font-medium rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition-all duration-200"
      >
        {editText}
      </button>
      <button
        onClick={onDelete}
        className="px-5 py-2 bg-red-600 cursor-pointer text-white text-sm font-medium rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition-all duration-200"
      >
        {deleteText}
      </button>
    </div>
  );
};

const CategoryBadge = ({ category }: { category: string }) => {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "leisure/entertainment":
        return "bg-blue-100 text-[blue-800] border-blue-200";
      case "culture/nature":
        return "bg-green-100 text-green-800 border-green-200";
      case "entertainment":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs border ${getCategoryColor(category)}`}
    >
      {category}
    </span>
  );
};

function RouteComponent() {
  const venueData = generateVenueData();

  const handleEdit = (venue: any) => {
    console.log("Edit venue:", venue);

    alert(`Edit venue: ${venue.name}`);
  };

  const handleDelete = (venue: any) => {
    console.log("Delete venue:", venue);

    if (window.confirm(`Are you sure you want to delete ${venue.name}?`)) {
      alert(`Deleted venue: ${venue.name}`);
    }
  };

  const tableData = venueData.map((venue) => ({
    id: venue.id,
    name: (
      <div className="font-inter flex items-center ">
        <span className=" text-[#06275A] text-base text-nowrap">
          {venue.name}
        </span>
      </div>
    ),
    category: <CategoryBadge category={venue.category} />,
    address: (
      <span className="text-[#06275A] text-base text-nowrap">
        {venue.address}
      </span>
    ),
    lastUpdated: (
      <span className="text-[#06275A] text-base text-nowrap">
        {venue.lastUpdated}
      </span>
    ),
    actions: (
      <ActionButtons
        onEdit={() => handleEdit(venue)}
        onDelete={() => handleDelete(venue)}
      />
    ),
    // Raw data for filtering
    _rawName: venue.name,
    _rawCategory: venue.category,
    _rawAddress: venue.address,
    Category: venue.category,
  }));

  const headers = [
    { name: "Name", value: "name", sortable: true, width: "300px" },
    { name: "Category", value: "category", sortable: true, width: "200px" },
    { name: "Address", value: "address", sortable: true, width: "300px" },
    {
      name: "Last Updated",
      value: "lastUpdated",
      sortable: true,
      width: "180px",
    },
    { name: "Actions", value: "actions", width: "200px" },
  ];

  // Filter options
  const filters = [
    {
      name: "Category",
      fields: ["Leisure/Entertainment", "Culture/Nature", "Entertainment"],
    },
  ];

  const handleAddVenue = () => {
    console.log("Add new venue clicked");
    alert("Add new venue functionality");
  };

  const handleRowClick = (row: any, index: number) => {
    console.log("Row clicked:", row, "Index:", index);
  };

  return (
    <div className="">
      {/* Statistics Cards */}
      <div className="mb-5 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Total Venues
          </h3>
          <p className="text-3xl font-bold text-[#06275A] ">
            {venueData.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Entertainment
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            {venueData.filter((v) => v.category === "Entertainment").length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Culture/Nature
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {venueData.filter((v) => v.category === "Culture/Nature").length}
          </p>
        </div>
      </div>

      {/* Main Table */}
      <Table
        headers={headers}
        rows={tableData}
        searchable={true}
        searchableFields={["_rawName", "_rawAddress", "_rawCategory"]}
        filters={filters}
        showAddButton={true}
        addButtonText="Add Venue"
        onAddButtonClick={handleAddVenue}
        onRowClick={handleRowClick}
        maxRows={10}
        striped={true}
        stickyHeader={false}
        emptyStateMessage="No venues found. Start by adding your first venue!"
      />
    </div>
  );
}
