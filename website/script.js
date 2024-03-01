import { initCanvas } from "./initCanvas.js";
import { EarthModule } from "./earthModule.js";

const ctx = initCanvas();

const createModule = (params) => {
  const modules = [];
  params.forEach((p) => {
    const newModule = new EarthModule(p.name, p.type, p.coord, p.size, p.color);
    modules.push(newModule);
  });
  return modules;
};

const runCanvas = (params) => {
  const earthModules = createModule(params.EarthModules);
  console.log(earthModules);

  earthModules.forEach((m) => {
    m.draw(ctx);
  });
};

fetch("./params.json")
  .then((response) => response.json())
  .then((json) => runCanvas(json));
