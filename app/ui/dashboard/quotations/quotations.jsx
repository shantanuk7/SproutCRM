import { Quotation } from "@/app/lib/models";
import { connectToDB } from "@/app/lib/utils";
import LatestQuotations from "./LatestQuotations";

// export const fetchLatestQuotations = async () => {
//   "use server"
//   try {
//       await connectToDB();
//       const latestQuotations = await Quotation.find()
//           .sort({ createdAt: -1 })
//           .limit(10);
//       return latestQuotations;
//   } catch (error) {
//       console.error("Error fetching latest quotations:", error);
//       throw new Error("Failed to fetch latest quotations!");
//   }
// };

const Quotations = () => {
  return (
    <div>
      {/* <LatestQuotations fetchLatestQuotations={fetchLatestQuotations}/> */}
      <LatestQuotations/>
    </div>
  );
};

export default Quotations;
