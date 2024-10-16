import React, { useEffect, useState } from "react";
import "./SellerEnquiries.css";
import { getSellerEnquiries } from "../../services/api";
import Spinner from "../../Components/Spinner/Spinner";
import { formatDate } from "../../utils/utils";

function SellerEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        setLoading(true);
        let res = await getSellerEnquiries();
        setLoading(false);
        console.log("enquiries-------------", res ? res : "no res");
        setEnquiries(res);
      } catch (error) {
        setLoading(false);
        console.log("Error while returning enquiry : ", error);
      }
    };
    fetchEnquiry();
  }, []);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : enquiries?.length == 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No enquiries found!
        </div>
      ) : (
        <div className="mt-5">
          <h2>Seller Enquiries</h2>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Car</th>
                <th scope="col">Location</th>
                <th scope="col">Mobile</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {enquiries?.map((enq, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{enq.name ? enq.name : "_"}</td>
                  <td>{enq.car_name ? enq.car_name : "_"}</td>
                  <td>{enq.location ? enq.location : "_"}</td>
                  <td>{enq.phone ? enq.phone : "_"}</td>
                  <td>{formatDate(enq.createdAt)}</td>
                  {enq.connected ? (
                    <td style={{ color: "green" }}>Connected</td>
                  ) : (
                    <td style={{ color: "red" }}>Pending</td>
                  )}
                  <td>
                    <input type="checkbox" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SellerEnquiries;
