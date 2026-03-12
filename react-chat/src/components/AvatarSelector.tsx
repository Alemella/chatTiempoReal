import { useState, useEffect } from "react";
import "./AvatarSelector.css";

const avatars = [
  "/avatar/avatarBlue.png",
  "/avatar/avatarOrange.png",
];

function AvatarSelector() {

  const [selected, setSelected] = useState(
    localStorage.getItem("avatar") || "/avatar/avatarBlue.png"
  );

  useEffect(() => {

    const avatar = localStorage.getItem("avatar");

    if (!avatar) {
      localStorage.setItem("avatar", "/avatar/avatarBlue.png");
    }

  }, []);

  const selectAvatar = (avatar:string) => {
    setSelected(avatar);
    localStorage.setItem("avatar", avatar);
  };

  return (

    <div className="avatar-selector">
      <span className="avatar-label">Elige tu avatar:</span>

      <div className="avatar-options">

      {avatars.map((avatar) => (

        <img
          key={avatar}
          src={avatar}
          onClick={() => selectAvatar(avatar)}
          className={`avatar-option ${selected === avatar ? "selected" : ""}`}
        />

      ))}

      </div>

    </div>

  );

}

export default AvatarSelector;