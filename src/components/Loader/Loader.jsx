import { LoaderIcon } from "react-hot-toast";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        margin: "1rem auto",
        color: "var(--primary-600)",
      }}>
      <p>Loading Data...</p>
      <LoaderIcon style={{ width: "1.3rem", height: "1.3rem" }} />
    </div>
  );
};

export default Loader;
