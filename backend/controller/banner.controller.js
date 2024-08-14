import prisma from "../prisma/prisma.js";
export const addBanner = async (req, res) => {
  try {
    const { title, description, link, time } = req.body;
    const banner = await prisma.banner.create({
      data: {
        title: title,
        description: description,
        link: link,
        status: false,
        time: time,
      },
    });
    res.status(201).json(banner);
  } catch (error) {
    console.log("error => ", error);
    res.status(500).json({ error: "ISE" });
  }
};

export const getBanner = async (req, res) => {
  try {
    const banner = await prisma.banner.findMany({
      where: {
        status: true,
      },
      take: 1,
    });
    res.status(200).json(banner[0]);
  } catch (error) {
    console.log("error => ", error);
    res.status(500).json({ error: "ISE" });
  }
};
