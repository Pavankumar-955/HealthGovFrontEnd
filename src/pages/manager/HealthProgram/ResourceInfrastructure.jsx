const ResourceInfrastructure = ({ infrastructures }) => {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      
      <div className="bg-gray-800 text-white p-2 text-xs font-bold px-4">
        Infrastructure Locations
      </div>

      <div className="divide-y">
        {infrastructures?.length > 0 ? (
          infrastructures.map((infra) => (
            <div
              key={infra.infraId}
              className="p-3 bg-gray-50 flex justify-between items-center"
            >
              <div>
                <p className="font-bold text-gray-700">{infra.location}</p>
                <p className="text-[10px] text-gray-500">
                  Capacity: {infra.capacity}
                </p>
              </div>

              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                {infra.status?.replace("_", " ")}
              </span>
            </div>
          ))
        ) : (
          <p className="p-4 text-gray-500 italic">
            No infrastructure records found.
          </p>
        )}
      </div>

    </div>
  );
};

export default ResourceInfrastructure;