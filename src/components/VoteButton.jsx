import React from "react";
import { useAccount, useSignTypedData } from "wagmi";
import axios from "axios";

const VoteButton = ({ proposalId, choice, space }) => {
  const { address } = useAccount();

  const { signTypedDataAsync } = useSignTypedData();

  const handleVote = async () => {
    try {
      console.log("🔎 Voting initiated");
      console.log("Proposal ID:", proposalId);
      console.log("Choice:", choice);
      console.log("Address:", address);

      // Validate inputs
      if (!proposalId || typeof proposalId !== "string") {
        console.error("❌ Invalid proposalId:", proposalId);
        return;
      }
      const parsedChoice = Number(choice);
      if (isNaN(parsedChoice) || parsedChoice < 1) {
        console.error("❌ Invalid choice:", choice);
        return;
      }
      if (!address) {
        console.error("❌ No connected wallet address");
        return;
      }

      const timestamp = Math.floor(Date.now() / 1000);
      console.log("Timestamp:", timestamp);

      // Prepare domain, types, and message
      const domain = {
        name: "snapshot",
        version: "0.1.4",
      };

      const types = {
        Vote: [
          { name: "space", type: "string" },
          { name: "proposal", type: "string" },
          { name: "choice", type: "uint32" },
          { name: "metadata", type: "string" },
          { name: "from", type: "address" },
          { name: "timestamp", type: "uint64" },
        ],
      };

      const message = {
        space: space,
        proposal: proposalId,
        choice: parsedChoice,
        metadata: JSON.stringify({}), // adjust if you want extra data
        from: address,
        timestamp,
      };

      console.log("📝 Message to sign:", message);

      // Sign typed data
      const signature = await signTypedDataAsync({
        domain,
        types,
        primaryType: "Vote",
        message,
      });

      console.log("✅ Signature:", signature);

      // Prepare payload for Snapshot hub
      const payload = {
        address,
        data: {
          domain,
          types,
          message,
          primaryType: "Vote",
        },
        sig: signature,
      };

      console.log("🚀 Sending vote payload:", payload);

      const response = await axios.post(
        "https://hub.snapshot.org/api/msg",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("🎉 Vote submitted successfully:", response.data);
      alert("Vote submitted!");
    } catch (err) {
      console.error("❌ SEQ Voting error:", err);
      alert(`Voting failed: ${err.message || err}`);
    }
  };

  return (
    <button
      onClick={handleVote}
      className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
    >
      Vote
    </button>
  );
};

export default VoteButton;
