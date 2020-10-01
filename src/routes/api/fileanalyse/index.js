import multer from 'multer';
const upload = multer().single('upfile');

export async function post (req, res) {

    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});

    await useMulter(req);

    const response = {};
    response.name = req.file.originalname;
    response.type = req.file.mimetype;
    response.size = req.file.size;

    res.end(JSON.stringify(response));

}

function useMulter (req) {
    return new Promise(resolve => {
        upload(req, '', err => {
            resolve();
        });
    });
}