import { nanoid } from 'nanoid';
import db from '../models/links.js';
import dotenv from 'dotenv';
const BASE='http://localhost:5000/';
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
      const newurl=new URL(randomid,BASE);
      res.json({opurl:newurl.href})
    }
    else {
      const newurl=new URL(exurl.short,BASE);
      res.json({opurl:newurl.href})
    }
  } catch (err) {
    throw new Error(err);
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