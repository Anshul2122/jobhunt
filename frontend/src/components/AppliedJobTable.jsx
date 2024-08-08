import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const ApplictionTable = () => {
  const {allAppliedJobs} = useSelector(store=>store.job);
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied Jobs</TableCaption>
        <TableHeader>
          <TableHead>Date</TableHead>
          <TableHead>Job role</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableHeader>
        <TableBody>
        {
          allAppliedJobs.length>=0? <span>you haven't for any job yet</span> : allAppliedJobs.map((appliedJob) => (
            <TableRow key={appliedJob?._id}>
              <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
              <TableCell>{appliedJob.job?.title}</TableCell>
              <TableCell>{appliedJob.job?.company?.name}</TableCell>
              <TableCell className="text-right">
                <Badge className={`${appliedJob?.status === "rejected" ? 'bg-red-400' : appliedJob.status === 'pending...' ? 'bg-gray-400' : 'bg-green-400'}`}>{appliedJob.status.toUpperCase()}</Badge>
              </TableCell>
            </TableRow>
          ))
        }
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplictionTable;
