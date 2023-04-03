import * as React from "react";

export const getKipudModalBody = (playersChanges: any) => {
  return (
    <>
      {playersChanges && (
        <>
          {Object.keys(playersChanges).length > 0 ? (
            <p>These Following changes will be made</p>
          ) : (
            <p>No changes have been made so far</p>
          )}
          {Object.entries(playersChanges).map(
            ([key, value]: any, index: number) => (
              <div className="players-changes" key={index}>
                <span>{key}</span>
                <span>{value > 0 ? `+${value}` : value}</span>
              </div>
            )
          )}
        </>
      )}
    </>
  );
};

// export const getPlayersDropdown = () => {
//   return (
//     <>
//       <div className="choose-player-block">
//         <select
//           className="players-options"
//           onChange={onselectionchange}
//           ref={optionRef}
//         >
//           <option>Select...</option>
//           {players.map((player, index) => (
//             <option key={index}>{player}</option>
//           ))}
//         </select>
//       </div>
//     </>
//   );
// };
