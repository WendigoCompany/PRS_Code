export default async function INIT({ lang }) {
    const Text = await (async () => {
      switch (lang.toLowerCase()) {
        case "en":
          // return import("@/Text/en/.json");
          return await  import("../text/en/Home.json");
  
        case "sp":
          // return import("@/Text/sp/.json");
          return await import("../text/sp/Home.json");
      }
    })();
  
    return {
      ...Text,
    };
  }
  