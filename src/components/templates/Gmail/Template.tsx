/* eslint-disable @next/next/no-img-element */
import React from "react";
import satori, { SatoriOptions } from "satori";

import { GmailFormState, DEFAULT_AVATAR } from "../../../store/form/gmail";
import {
  isThisYear,
  isToday,
  formatDistanceToNowStrict,
  format,
} from "date-fns";

type GmailTemplateProps = GmailFormState;

const RenderGmailTemplate = (
  props: GmailTemplateProps,
  options: SatoriOptions
) => {
  const date = new Date(props.date);

  const color = props.theme == "dark" ? "white" : "black";
  const bodyColor = props.theme == "dark" ? "white" : "#202020";
  const secondaryColor = props.theme == "dark" ? "#7E8E9B" : "#5B7083";
  const borderColor = props.theme == "dark" ? "#2D3942" : "#737373";
  return satori(
    <div
      style={{
        backgroundColor: props.theme == "dark" ? "black" : "white",
        color: color,
        display: "flex",
        flexDirection: "row",
        gap: "2px",
        height: "100%",
        width: "100%",
        paddingTop: 74,
        paddingRight: 38,
        paddingBottom: 38,
        paddingLeft: 38,
        fontSize: 52,
      }}
    >
      <div
        style={{
          display: "flex",
          width: 240,
        }}
      >
        <img
          style={{
            borderRadius: 240,
            objectFit: "cover",
          }}
          height={240}
          width={240}
          src={
            props.avatar && props.avatar !== "" ? props.avatar : DEFAULT_AVATAR
          }
          alt="avatar"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: 50,
          paddingRight: 240,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                fontWeight: "bold",
                fontSize: 120,
              }}
            >
              {props.from}
            </div>
            <div
              style={{
                display: "flex",
                color: secondaryColor,
                fontSize: 70,
              }}
            >
              {isToday(date)
                ? format(date, "h:mm a")
                : isThisYear(date)
                ? format(date, "eee, MMM M, h:mm a")
                : format(date, "eee, MMM M, yyyy, h:mm a")}{" "}
              (
              <span>
                {props.time_ago && props.time_ago !== ""
                  ? props.time_ago
                  : formatDistanceToNowStrict(date)}{" "}
                ago
              </span>
              )
            </div>
          </div>
          <div
            style={{
              display: "flex",
              color: secondaryColor,
              fontSize: 90,
              paddingBottom: 8,
            }}
          >
            to {props.to}{" "}
            <span>
              <svg width={110} height={110} viewBox="0 0 24 24">
                <path fill="#222" d="m7 10l5 5l5-5z"></path>
              </svg>
            </span>
          </div>
        </div>
        <div
          style={{
            whiteSpace: "pre-wrap",
            color: bodyColor,
            fontWeight: 500,
            fontSize: 112,
            letterSpacing: -1,
            marginTop: "2rem",
            marginBottom: "2rem",
            minHeight: 320,
          }}
        >
          {props.body}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 80,
            fontWeight: 500,
          }}
        >
          {props.suggestions.map((suggestion, i) => {
            return (
              <div
                key={suggestion}
                style={{
                  color: "#005DCD",
                  borderColor: borderColor,
                  borderWidth: 8,
                  borderStyle: "solid",
                  borderRadius: 34,
                  paddingTop: 45,
                  paddingBottom: 45,
                  paddingLeft: 90,
                  paddingRight: 90,
                  marginLeft: i !== 0 ? 82 : 0,
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
