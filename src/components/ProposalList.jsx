import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import VoteButton from "./VoteButton";

const GET_SPACES = gql`
  query {
    spaces(first: 20) {
      id
      name
    }
  }
`;

const GET_PROPOSALS = gql`
  query Proposals($space: String!) {
    proposals(
      first: 5
      where: { space_in: [$space] }
      orderBy: "created"
      orderDirection: desc
    ) {
      id
      title
      body
      choices
      start
      end
      state
      space {
        id
      }
    }
  }
`;

const ProposalList = () => {
  // console.log("ProposalList component rendered");

  const [selectedSpace, setSelectedSpace] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);

  const { loading, error, data } = useQuery(GET_SPACES);

  const {
    loading: proposalsLoading,
    error: proposalsError,
    data: proposalsData,
  } = useQuery(GET_PROPOSALS, {
    variables: { space: selectedSpace },
    skip: !selectedSpace,
  });

  // console.log("Proposals data:", proposalsData);

  if (loading)
    return (
      <p className="text-gray-400 text-center text-lg">Loading spaces...</p>
    );
  if (error)
    return (
      <p className="text-red-400 text-center text-lg">
        Error loading spaces: {error.message}
      </p>
    );

  return (
    <div className="p-2 sm:p-8 max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
        DAO Spaces
      </h2>

      <main className="md:flex gap-2 ">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 mb-8">
          {data.spaces.map((space) => (
            <li
              key={space.id}
              onClick={() => {
                console.log("Clicked space:", space.id);
                setSelectedSpace(space.id);
                setSelectedProposal(null);
              }}
              className="cursor-pointer bg-gray-800 bg-opacity-50 p-4 rounded-xl shadow-lg hover:bg-opacity-70 transition-all duration-200 text-gray-100 hover:text-cyan-300"
            >
              {space.name}
            </li>
          ))}
        </ul>

        <div className="">
          {selectedSpace && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-100 mb-4">
                Proposals for {selectedSpace}
              </h3>

              {proposalsLoading && (
                <p className="text-gray-400 text-center text-lg">
                  Loading proposals...
                </p>
              )}
              {proposalsError && (
                <p className="text-red-400 text-center text-lg">
                  Error loading proposals: {proposalsError.message}
                </p>
              )}

              {proposalsData &&
              proposalsData.proposals &&
              proposalsData.proposals.length > 0 ? (
                <ul className="space-y-2">
                  {proposalsData.proposals.map((proposal) => (
                    <li
                      key={proposal.id}
                      onClick={() => {
                        console.log("Clicked proposal:", proposal.id);
                        setSelectedProposal({
                          ...proposal,
                          space: {
                            id: proposal.space?.id || selectedSpace,
                          },
                        });
                      }}
                      className="cursor-pointer border border-gray-700 p-4 rounded-lg bg-gray-800 bg-opacity-30 hover:bg-opacity-50 transition-all duration-200 text-gray-200 hover:text-cyan-300"
                    >
                      {proposal.title || "No title"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-center">
                  No proposals found for this space.
                </p>
              )}
            </div>
          )}

          {selectedProposal && (
            <div className="mt-8 p-6 border border-gray-700 rounded-xl bg-gray-800 bg-opacity-50 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-100 mb-3">
                {selectedProposal.title}
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {selectedProposal.body}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                State:{" "}
                <span className="font-semibold">{selectedProposal.state}</span>{" "}
                | Start:{" "}
                {new Date(selectedProposal.start * 1000).toLocaleString()} |
                End: {new Date(selectedProposal.end * 1000).toLocaleString()}
              </p>
              <h4 className="font-semibold text-gray-200 mb-2">Choices:</h4>
              <ul className="list-disc ml-6 text-gray-300">
                {selectedProposal.choices.map((choice, index) => (
                  <li key={index} className="py-1">
                    {choice}
                    <VoteButton
                      proposalId={selectedProposal.id}
                      choice={index + 1}
                      space={selectedProposal.space.id}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProposalList;
