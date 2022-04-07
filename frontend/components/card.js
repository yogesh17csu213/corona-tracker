import Card from "react-bootstrap/Card";
import React from "react";
  
export default function SingleCard(props) {
  return (
      <Card style={{ width: "22rem",minHeight:"250px" }}>
        <Card.Body>
          <Card.Title style={{ color: "green",marginBottom:"40px" }}>  {props.data?.newsDate}</Card.Title>
          <a href={props.data?.newsLink}>  
            <Card.Subtitle className="mb-2 text-muted">
                {props.data?.newsHeadline}
            </Card.Subtitle>
          </a>
        </Card.Body>
      </Card>
  );
}