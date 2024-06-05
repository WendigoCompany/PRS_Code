export default async function INIT({ lang }) {
    const Text = await (async () => {
      switch (lang.toLowerCase()) {
        case "en":
          // return import("@/Text/en/.json");
          return await  import("../text/en/Game.json");
  
        case "sp":
          // return import("@/Text/sp/.json");
          return await import("../text/sp/Game.json");
      }
    })();
  
    return {
      ...Text,
    };
  }
  