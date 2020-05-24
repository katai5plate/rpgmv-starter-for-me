import fs from "fs-extra";
import vm from "vm";

/*
 * Map000.json 系を読み込む
 */
interface MapJson {
  battleback1Name: string;
  battleback2Name: string;
  bgm: { name: string };
  bgs: { name: string };
  parallaxName: string;
  events: [
    {
      pages: [
        {
          image: {
            characterName: string;
          };
          list: any;
          moveRoute: {
            list: any;
          };
        }
      ];
    }
  ];
}
/**
 * Map000.json 系
 */
export const jsonMaps: MapJson[] = fs
  .readdirSync("./data")
  .filter((x) => /^Map\d/.test(x))
  .map((x) => `./data/${x}`)
  .map((x) => fs.readJSONSync(x));

/**
 * 指定されたプラグイン一覧
 */
export const connectedPlugins: string[] = (() => {
  const context = vm.createContext();
  vm.runInContext(
    fs.readFileSync("./js/plugins.js", { encoding: "utf8" }),
    context
  );
  return context["$plugins"];
})().map((x: any) => x.name);
