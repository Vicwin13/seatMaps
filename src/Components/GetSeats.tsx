import { Offer, Row, SeatGroup, SeatingResponse, Section } from "./types";
import { useEffect, useState } from "react";

import fine from "../App.module.css";
import { setresdummy } from "./SeatResponseDummy";

export default function GetSeats() {
  const [data, setData] = useState<SeatingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = () => {
      try {
        const response = setresdummy as SeatingResponse;
        setData(response);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <> Loading...</>;
  }

  if (error) {
    return <> Error: {error}</>;
  }

  return (
    <>
      {data?.seating.offers.map((offer: Offer) => (
        <div
          style={{
            margin: "0 auto",
            width: "fit-content",
          }}
          key={offer.segment_code}>
          {offer.seatmap ? (
            offer.seatmap.sections.map((section: Section, sectionIndx) => (
              <div key={sectionIndx}>
                {section.rows.map((row: Row) => (
                  <div className={fine.economy} key={row.row_number}>
                    {row.seat_groups.map((SeatGroup, groupIndx) => (
                      <div className={fine.cover} key={groupIndx}>
                        {SeatGroup.map((seat: SeatGroup) => (
                          <div
                            key={seat.name}
                            className={fine.seat}
                            style={{
                              backgroundColor:
                                seat.state === "unavailable"
                                  ? "#E9E8FC"
                                  : "#4643E3",
                              height: "32px",
                              width: "22px",
                              textAlign: "center",
                              padding: "3px",
                            }}>
                            <div className={fine.box}>
                              This seat is {seat.state}
                              <p>
                                Seat N0:{" "}
                                <span
                                  style={{
                                    fontSize: "23px",
                                    fontWeight: "bolder",
                                  }}>
                                  {seat.name}{" "}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                        {groupIndx === 0 && (
                          <div
                            style={{
                              textAlign: "center",
                              paddingRight: ".2rem",
                              paddingLeft: ".5rem",
                              fontSize: "16px",
                              fontWeight: "bold",
                            }}>
                            {row.row_number}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div>No Seat Map Here</div>
          )}
        </div>
      ))}
    </>
  );
}
