/* eslint-disable @next/next/no-img-element */
import React from "react";
import satori, { SatoriOptions } from "satori";

import { GmailFormState } from "../../store/form";

type PrimitiveGmailTemplateProps = React.ComponentPropsWithoutRef<"div">;
type GmailTemplateProps = GmailFormState;

const RenderGmailTemplate = (
  props: GmailTemplateProps,
  options: SatoriOptions
) => {
  return satori(
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        display: "flex",
        gap: "2px",
        height: "100%",
        width: "100%",
        paddingTop: 40,
        paddingRight: 4,
        paddingBottom: 4,
        paddingLeft: 4,
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <img
          style={{
            borderRadius: 128,
            objectFit: "cover",
            border: "5px solid black",
          }}
          height={128}
          width={128}
          src={props.avatar}
          alt="avatar"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "2rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                color: "#1F1F1F",
                fontSize: 32,
              }}
            >
              {props.from}
            </div>
            <div
              style={{
                display: "flex",
                color: "#222222",
                fontSize: 32,
              }}
            >
              {props.time} (<span>{props.time_ago} ago</span>)
            </div>
          </div>
          <div
            style={{
              display: "flex",
              color: "#222222",
              fontSize: 32,
            }}
          >
            to {props.to} <span>[v]</span>
          </div>
        </div>
        <div
          style={{
            whiteSpace: "pre-wrap",
            color: "#222222",
            fontWeight: 500,
            fontSize: 50,
            letterSpacing: -1,
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          {props.body}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 40,
            fontWeight: 500,
          }}
        >
          {props.suggestions.map((suggestion, i) => {
            return (
              <div
                key={suggestion}
                style={{
                  color: "#005DCD",
                  padding: "1rem 2.5rem",
                  border: "2px solid #787878",
                  borderRadius: "1.3rem",
                  marginTop: "0.7rem",
                  marginLeft: i !== 0 ? "1.25rem" : "",
                }}
              >
                {suggestion}
              </div>
            );
          })}
        </div>
      </div>
    </div>,
    options
  );
};

export default RenderGmailTemplate;
