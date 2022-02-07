import React from "react";

export default function Paste({ paste }) {
  return (
    <div>
      <h4>{paste.title}</h4>
      <code>{paste.content}</code>
      <p>
        {paste.author} | {paste.date}
      </p>
    </div>
  );
}
