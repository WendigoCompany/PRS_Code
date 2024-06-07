const zip_table = [
  { uz: "name", z: "@a@" },
  { uz: "money", z: "@b@" },
  { uz: "waifus", z: "@c@" },
  { uz: "costumes", z: "@d@" },
];

export const unzip_keys = (data) => {
  zip_table.map((zip) => {
    data = data.replaceAll(zip.z, zip.uz);
  });

  return data;
};

export const zip_keys = (data) => {
  data = JSON.stringify(data);

  zip_table.map((zip) => {
    data = data.replaceAll(zip.uz, zip.z);
  });

  return data;
};
