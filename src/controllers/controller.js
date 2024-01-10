import { nanoid } from 'nanoid';
import db from '../models/links.js';
import dotenv from 'dotenv';
dotenv.config();

export const home = (req, res) => {
  res.render('home');
}

export const upload = async (req, res) => {
  const { link } = req.body;
  try {
    const exurl = await db.findOne({ URL: link });
    
    if (!exurl) {
      const randomid = nanoid(6);
      const url = await db.create({
        URL: link,
        short: randomid
      });
      const newurl=new URL(randomid,process.env.BASE);
      res.json({opurl:newurl.href})
    }
    else {
      const newurl=new URL(exurl.short,process.env.BASE);
      res.json({opurl:newurl.href})
    }
  } catch (err) {
    res.json({
      message:"Server Responding try again."
    })
  }
}

export const redirect = async (req, res) => {
  const { url } = req.params;
  try {
    const link = await db.findOne({ short: url });
    res.redirect(link.URL);
  }
  catch {
    res.status(404).json({
      message: 'NOT FOUND'
    });
  }
}

export const NotFound = (req, res) => {
  res.status(404).json({
    message: 'NOT FOUND'
  });
}