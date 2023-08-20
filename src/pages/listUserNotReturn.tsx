import React, { useEffect, useState } from "react";
import { TableScrollArea } from "@/component/listUserNotReturn";
import Layout from "@/component/layout";
import { apiRequest } from "@/utils/apiHelpers";
export default function ListBook() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]: any = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiRequest({
          method: "GET",
          url: "/book/list-not-return/?page=1&pageSize=100",
        });
        setData(result.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <Layout>
        <TableScrollArea data={data} />
      </Layout>
    </div>
  );
}
