"use client";
import React, { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import Card from "./_components/Card";
import TopHeader from "./_components/TopHeader";
import Banner from "./_components/Banner";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import Loader from "./_components/Loader";

interface Thing {
  id: number;
  name: string;
  isChecked: boolean;
  createdAt: Date; // Assuming createdAt is of type string, update it accordingly
  updatedAt: Date; // Assuming updatedAt is of type string, update it accordingly
}

export default function Home() {
  const [hasAcces, setHasAcces ]= useState(false)
  const router = useRouter();
 
 
  const [page, setPage] = useState(1);
  const pageSize = 6; // Number of items per page
  const [things, setThings] = useState<Thing[]>([]);

  const { status, data, error } = api.post.getLatest.useQuery({
    from: (page - 1) * pageSize, // Calculate the offset based on page number
    items: 6, // Number of items to take per page
  });

 

  useEffect(() => {
    const token = getCookie('token')

    if(token){
      setHasAcces(true)
    }else{
      router.push('/login')
    }

  
    
  }, [])
  


  useEffect(() => {
    if (data && Array.isArray(data)) {
      setThings(data);
    }  }, [data]);



  const { mutate } = api.post.modifyInterest.useMutation();

  const handleCheckboxChange = async (id: number, isChecked: boolean) => {
    try {
      mutate({ id, isChecked });
      // Update local state after mutation succeeds
      setThings((prev) =>
        prev.map((thing) =>
          thing.id === id ? { ...thing, isChecked } : thing,
        ),
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

  if(!hasAcces){
    return (
     <Loader />

    )
  }

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
              {status === "error" && <h2>Error: {error.message}</h2>}
              {status === "pending" && <h2>Loading...</h2>}



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
  

              
              
              <div className="mt-4 flex justify-between text-blue-600 gap-2">
                <button onClick={handlePrevPage} disabled={page === 1}>
                  Previous 
                  {' '}

                </button>
                <div className="flex gap-2">
                  {Array(17)
                    .fill(0)
                    .map((_, index) => (
                      <button
                        key={index + 1}
                        className={page === index + 1 ? "underline" : ""}
                        onClick={() => setPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                </div>
                  <button
                  onClick={handleNextPage}
                  disabled={things?.length < pageSize}
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
