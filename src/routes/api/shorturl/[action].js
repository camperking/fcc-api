import dns from 'dns';
import crypto from 'crypto';
import { db } from '../../../server.js';



export async function post (req, res) {

    const shorturls = db.getCollection('shorturls');
    
    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
    
    const { action } = req.params;

    try {
        const url = new URL(req.query.url);

        dns.lookup(url.hostname, (err, address, family) => {
            if (err) {
                res.end('{"error":"invalid URL"}');
            } else {

                const hash = crypto.createHash('md5');
                hash.update(url.toString());
                let short_url = hash.digest('hex');
                
                let json = {
                    "original_url": url.toString(),
                    short_url
                }

                res.end(JSON.stringify(json));

                shorturls.insertOne(json);

            }
        });

    } catch (err) {
        res.end('{"error":"invalid URL"}');
    }

}

// 07ab071c41bab383f00019662663303b

export async function get (req, res) {
    
    const short_url = req.params.action;

    const shorturls = db.getCollection('shorturls');

    const shorturl = shorturls.findOne({ short_url });

    if (shorturl) {
        //redirect
        res.writeHead(302, {
            "Location": shorturl.original_url
        });
        res.end();
        
    } else {
        res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
        res.end('{"error":"invalid URL"}');
    }

}