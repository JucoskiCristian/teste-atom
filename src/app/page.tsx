import Image from "next/image";
import BarChart from "./components/BarChart";
import CircleWithNodes from "./components/CircleWithNodes";

export default function Home() {
  return (
    <div className="App">
      <h1>Exemplo de React + D3.js em TypeScript</h1>
      <CircleWithNodes />
    </div>
  );
}
