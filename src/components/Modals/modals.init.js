export async function INIT_LOAD({ lang }) {
  const Text = await (async () => {
    switch (lang.toLowerCase()) {
      case "en":
        return import("../../text/en/Modals/Load.json");
      case "sp":
        return import("../../text/sp/Modals/Load.json");
    }
  })();

  return {
    ...Text,
  };
}




export async function INIT_NWG({ lang }) {
    const Text = await (async () => {
      switch (lang.toLowerCase()) {
        case "en":
          return import("../../text/en/Modals/NWG.json");
        case "sp":
          return import("../../text/sp/Modals/NWG.json");
      }
    })();
  
    return {
      ...Text,
    };
  }
  

  export async function INIT_Save({ lang }) {
    const Text = await (async () => {
      switch (lang.toLowerCase()) {
        case "en":
          return import("../../text/en/Modals/Save.json");
        case "sp":
          return import("../../text/sp/Modals/Save.json");
      }
    })();
  
    return {
      ...Text,
    };
  }
  
  export async function INIT_Back({ lang }) {
    const Text = await (async () => {
      switch (lang.toLowerCase()) {
        case "en":
          return import("../../text/en/Modals/Back.json");
        case "sp":
          return import("../../text/sp/Modals/Back.json");
      }
    })();
  
    return {
      ...Text,
    };
  }
  
  export async function INIT_Home({ lang }) {
    const Text = await (async () => {
      switch (lang.toLowerCase()) {
        case "en":
          return import("../../text/en/Modals/Home.json");
        case "sp":
          return import("../../text/sp/Modals/Home.json");
      }
    })();
  
    return {
      ...Text,
    };
  }
  

