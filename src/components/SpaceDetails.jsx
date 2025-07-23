import React from "react";
import { useParams } from "react-router-dom";
import ProposalList from "./ProposalList";

const SpaceDetails = () => {
  const { spaceId } = useParams();

  console.log("spaceId from useParams:", spaceId); 

  if (!spaceId) return <p>No space selected.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">DAO Space: {spaceId}</h1>
      <ProposalList spaceId={spaceId} />
    </div>
  );
};

export default SpaceDetails;
