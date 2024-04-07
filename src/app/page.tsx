'use client'
import React, { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import Card from "./_components/Card";
import TopHeader from "./_components/TopHeader";
import Banner from "./_components/Banner";

interface Thing {
  id: number;
  name: string;
  isChecked: boolean;
  createdAt: string; // Assuming createdAt is of type string, update it accordingly
  updatedAt: string; // Assuming updatedAt is of type string, update it accordingly
}


export default function Home() {
  const [page, setPage] = useState(1);
  const pageSize = 10; // Number of items per page
  const [things, setThings] = useState<Thing[]>([])

  const { status, data, error } = api.post.getLatest.useQuery<Thing[]>({
    from: (page - 1) * pageSize, // Calculate the offset based on page number
    items: pageSize, // Number of items to take per page
  });

  useEffect(() => {
    setThings(data)
  

  }, [data])
  

  const { mutate } = api.post.modifyInterest.useMutation();

  const handleCheckboxChange = async (id: number, isChecked: boolean)=> {
    try {
       mutate({ id, isChecked });
      // Update local state after mutation succeeds
      setThings((prev) =>
        prev.map((thing) =>
          thing.id === id ? { ...thing, isChecked } : thing
        )
      );
    } catch (error) {
      console.error("Error updating thing:", error);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <TopHeader />
      <Banner />
      <div className="mt-10 flex justify-center">
        <Card>
          <h2 className="text-[32px] font-semibold leading-10 ">
            Please Mark your Interest!
          </h2>
          <div className="mt-6 flex flex-col gap-3">
            <p className="">We will keep you notified</p>
          </div>
          <div className="flex flex-col gap-4 border-b-[1px] py-7 text-start ">
            <h2 className="text-xl font-medium">My saved Interest</h2>
            <div>
              {status === "pending" && <h2>Loading</h2>}

              {status === "error" && <h2>Error: {error.message}</h2>}

              {things?.map((thing) => (
                <div key={thing.id} className="flex gap-3">
                  <input
                    className="accent-black"
                    type="checkbox"
                    checked={thing.isChecked}
                    onChange={() =>
                      handleCheckboxChange(thing.id, !thing.isChecked)
                    }
                  />
                  <label htmlFor="">{thing.name}</label>
                </div>
              ))}

              {/* Pagination controls */}
              <div className="mt-4 flex justify-between text-blue-600">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <div className="flex gap-4">


                {Array(10).fill(0).map(( _, index)=> (
                  <button key={index+1} className={page===index+1 ? 'underline' : ''} onClick={() => (setPage(index+1))}>{index+1}</button>
                ))}
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={data?.length < pageSize}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
