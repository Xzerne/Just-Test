const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 8080;

function roundToDecimalPlace(num, decimalPlaces) {
    let factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
}

const axiosInstance = axios.create({
  timeout: 5000 // Thay đổi giá trị tùy thuộc vào yêu cầu của bạn
});

// Middleware để parse query params
app.use(express.json());

// Endpoint to bypass URLs
app.get('/fluxus', async (req, res) => {
    const link = req.query.url;
    if (link.startsWith("https://flux.li/android/external/start.php?")) {
        const bypassUrl = `https://fluxus-bypass-kkk.vercel.app/api/fluxus?link=${link}`;
        try {
            const response = await axios.get(bypassUrl);
            res.json({
                status: "success",
                bypassed: response.data.key,
                time: Date.now() / 1000
            });
        } catch (error) {
            res.status(500).json({ status: "error", error: error.message });
        }
    } else {
        res.status(400).json({ error: "Invalid link" });
    }
});

// Endpoint delta
app.get('/delta', async (req, res) => {
    const link = req.query.url;
    if (link.startsWith("https://gateway.platoboost.com/a/8?")) {
        const bypassUrl = `http://fi1.bot-hosting.net:6780/api/bypass?link=${link}`;
        try {
            const response = await axios.get(bypassUrl);
            res.json({
                status: "success",
                bypassed: response.data.key,
                time: Date.now() / 1000
            });
        } catch (error) {
            res.status(500).json({ status: "error", error: error.message });
        }
    } else {
        res.status(400).json({ error: "Invalid link" });
    }
});

// Endpoint linkvertise
app.get('/linkvertise', async (req, res) => {
    const link = req.query.url;
    if (link.startsWith('https://linkvertise.com/')) {
        try {
            const response = await axios.get(`https://api.bypass.vip/bypass?url=${link}`);
            res.json({
                status: "success",
                bypassed: response.data.result,
                time: Math.round(Date.now() / 1000)
            });
        } catch (error) {
            res.status(500).json({ status: "error", error: "Failed to bypass linkvertise" });
        }
    } else {
        res.status(400).json({ error: "Invalid linkvertise link" });
    }
});

// Endpoint rekonise
app.get('/rekonise', async (req, res) => {
    const link = req.query.url;
    if (link.startsWith("https://rekonise.com/")) {
        try {       
            const response = await axios.get(`https://api.rekonise.com/social-unlocks/${link.split(".com/")[1]}/unlock`);
            res.json({
                status: "success",
                bypassed: response.data.url,
                time: Math.round(Date.now() / 1000)
            });
        } catch (error) {
            res.status(500).json({ status: "error", error: "Failed to bypass rekonise" });
        }
    } else {
        res.status(400).json({ error: "Invalid Rekonise Link" });
    }
});

// Endpoint pastedrop
app.get('/pastedrop', async (req, res) => {
    const link = req.query.url;
    if (link.startsWith("https://paste-drop.com/")) {
        try {
            const response = await axios.get(link);
            const html = response.data;
            const $ = cheerio.load(html);
            const text = $('#content').text().trim();
            res.json({
                status: "success",
                bypassed : text,
                time: Math.round(Date.now() / 1000)
            });
        } catch (error) {
            res.status(500).json({ status: "error", error: "Failed to bypass pastedrop" });
        }
    } else {
        res.status(400).json({ error: "Invalid Pastedrop Link" });
    }
});

app.get('/workink', async (req, res) => {
    const link = req.query.url;
    if (link.startsWith('https://work.ink/')) {
        try {
            const response = await axios.get(`https://dlr.kys.gay/api/free/bypass?url=${link}`);
            res.json({
                status: "success",
                bypassed: response.data.result,
                time: Math.round(Date.now() / 1000)
            });
        } catch (error) {
            res.status(500).json({ status: "error", error: "Failed to bypass workink" });
        }
    } else {
        res.status(400).json({ error: "Invalid workink link" });
    }
});

app.get('/mboost', async (req, res) => {
    const link = req.query.url;
    if (link.startsWith('https://mboost.me/')) {
        try {
            const response = await axios.get(`https://ethos-testing.vercel.app/api/mboost/bypass?link=${link}`);
            res.json({
                status: "success",
                bypassed: response.data.bypassed,
                time: Math.round(Date.now() / 1000)
            });
        } catch (error) {
            res.status(500).json({ status: "error", error: "Failed to bypass mboost" });
        }
    } else {
        res.status(400).json({ error: "Invalid mboost link" });
    }
});

app.get('/boostink', async (req, res) => {
    const link = req.query.url;
    if (link.startsWith('https://boost.ink/')) {
        try {
            const response = await axios.get(`https://ethos-testing.vercel.app/api/boostink/bypass?link=${link}`);
            res.json({
                status: "success",
                bypassed: response.data.bypassed,
                time: Math.round(Date.now() / 1000)
            });
        } catch (error) {
            res.status(500).json({ status: "error", error: "Failed to bypass boostink" });
        }
    } else {
        res.status(400).json({ error: "Invalid boostink link" });
    }
});


app.get('/pastebin', async (req, res) => {
    const link = req.query.url;
    if (link.startsWith("https://pastebin.com/")) {
        try {
            const response = await axios.get(link);
            const html = response.data;
            const $ = cheerio.load(html);
            const text = $('body > div.wrap > div.container > div.content > div.post-view.js-post-view > div.highlighted-code > div.source.text > ol > li > div').text().trim();
            res.json({
                status: "success",
                bypassed: text,
                time: Math.round(Date.now() / 1000)
            });
        } catch (error) {
            res.status(500).json({ status: "error", error: "Failed to bypass Pastebin" });
        }
    } else {
        res.status(400).json({ error: "Invalid Pastebin Link" });
    }
});

app.get('/bypass', async (req, res) => {
    const link = req.query.url;

    // Validate URL parameter
    if (!link) {
        return res.status(400).json({ error: "No URL provided" });
    }
    
    if (link.startsWith("https://flux.li/android/external/start.php?")) {
        const bypassUrl = `https://nakano-miku-api-steel.vercel.app/fluxus?url=${encodeURIComponent(link)}`;
        try {
            const response = await axios.get(bypassUrl);
            res.json({
                status: "success",
                bypassed: response.data.bypassed,
                time: Date.now()
            });
        } catch (error) {
            res.status(500).json({ status: "error", error: error.message });
        }
    }
    else if (link.startsWith("https://linkvertise.com/")) {
        try {
            const response = await axios.get(`https://api.bypass.vip/bypass?url=${encodeURIComponent(link)}`);
            res.json({
                status: "success",
                bypassed: response.data.result,
                time: Math.round(Date.now() / 1000)
            });
        } catch (error) {
            res.status(500).json({ status: "error", error: "Failed to bypass linkvertise" });
        }
    } else if (link.startsWith("https://rekonise.com/")) {
        try {
            const response = await axios.get(`https://api.rekonise.com/social-unlocks/${link.split(".com/")[1]}/unlock`);
            res.json({
                status: "success",
                bypassed: response.data.url,
                time: Math.round(Date.now() / 1000)
            });
        } catch (error) {
            res.status(500).json({ status: "error", error: "Failed to bypass rekonise" });
        }
    } else if (link.startsWith("https://paste-drop.com/")) {
        try {
            const response = await axios.get(link);
            const html = response.data;
            const $ = cheerio.load(html);
            const text = $('#content').text().trim();
            res.json({
                status: "success",
                bypassed: text,
                time: Math.round(Date.now() / 1000)
            });
        } catch (error) {
            res.status(500).json({ status: "error", error: "Failed to bypass pastedrop" });
        }
    } else if (link.startsWith('https://pastebin.com/')) {
        try {
            const response = await axios.get(link);
            const html = response.data;
            const $ = cheerio.load(html);
            const text = $('body > div.wrap > div.container > div.content > div.post-view.js-post-view > div.highlighted-code > div.source.text > ol > li > div').text().trim();
            res.json({
                status: "success",
                bypassed: text,
                time: Math.round(Date.now() / 1000)
            });
        } catch (error) {
            res.status(500).json({ status: "error", error: "Failed to bypass pastebin" });
        }
    } 
    else if (link.startsWith("https://gateway.platoboost.com/a/8?")) {
        const endpurl = `http://fi1.bot-hosting.net:6780/api/bypass?link=${encodeURIComponent(link)}`;
        try {
            const response = await axios.get(endpurl);
            if (response.data.key === "Delta bypass hcaptcha patched. We only support links with out hcaptcha.") {
                res.json({
                    status: "error",
                    message: "An Error Has Found",
                });
            } else {
                res.json({
                    status: "success",
                    bypassed: response.data.key,
                    time: parseFloat(Date.now().toFixed(2))
                });
            }
        } catch (error) {
            res.status(500).json({ status: "error", error: error.message });
        }
    } else if (link.startsWith("https://work.ink/")) {
        try {
            const response = await axios.get(`https://dlr.kys.gay/api/free/bypass?url=${encodeURIComponent(link)}`);
            res.json({
                status: "success",
                bypassed: response.data.result,
                time: Math.round(Date.now() / 1000)
            });
        } catch (error) {
            res.status(500).json({ status: "error", error: "Failed to bypass workink" });
        }
    } else if (link.startsWith("https://mboost.me/")) {
        try {
            const response = await axios.get(`https://ethos-testing.vercel.app/api/mboost/bypass?link=${encodeURIComponent(link)}`);
            res.json({
                status: "success",
                bypassed: response.data.bypassed,
                time: Math.round(Date.now() / 1000)
            });
        } catch (error) {
            res.status(500).json({ status: "error", error: "Failed to bypass mboost" });
        }
    } else if (link.startsWith("https://boost.ink/")) {
        try {
            const response = await axios.get(`https://ethos-testing.vercel.app/api/boostink/bypass?link=${encodeURIComponent(link)}`);
            res.json({
                status: "success",
                bypassed: response.data.bypassed,
                time: Math.round(Date.now() / 1000)
            });
        } catch (error) {
            res.status(500).json({ status: "error", error: "Failed to bypass boostink" });
        }
    } else if (link.startsWith("https://loot-link.com/") || link.startsWith("https://lootlabs.gg/")) {
        try {
            const response = await axios.get(`https://dlr.kys.gay/api/free/bypass?url=${encodeURIComponent(link)}`);
            res.json({
                status: "success",
                bypassed: response.data.result,
                time: Math.round(Date.now() / 1000)
            });
        } catch (error) {
            res.status(500).json({ status: "error", error: "Failed to bypass lootlab" });
        }
    } else if (link.startsWith("https://pandadevelopment.net")) {
        try {
            const encodedLink = encodeURIComponent(link);
            const response = await axios.get(`https://dlr.kys.gay/api/free/bypass?url=${encodedLink}`);
            if (response.data.result === "bypass fail! Please encode to URI your link before sending it to Delorean API!") {
                res.json({
                    status: "error",
                    message: "PLEASE ENCODE URL TO URI TO BYPASS",
                    time: Math.round(Date.now() / 1000)
                });
            } else if (response.data.result.includes("bypass fail! key isn't in the html")) {
                res.json({
                    status: "success",
                    bypassed: "You've been whitelisted",
                    time: Math.round(Date.now() / 1000)
                });
            } else {
                res.json({
                    status: "success",
                    bypassed: response.data.result,
                    time: Math.round(Date.now() / 1000)
                });
            }
            
        } catch (error) {
            res.status(500).json({ status: "error", error: "Failed to bypass pandadevelopment" });
        }
    }
    else {
        res.status(400).json({ error: "NOT SUPPORT URL OR ERROR TO BYPASS TRY AGAIN LATER!!" });
    }
});


app.get('/website-bypass', (req, res) => {
  res.redirect('https://xzerne.github.io/otaku-is-unbreakable');
});

app.get('/', (req, res) => {
    res_text = `
    API MADE BY thanhtai040312@gmail.com <br>
    <br>
    CONTACT ME IF YOU HAVE ANY PROBLEMS <br>
    ==================== <br>
    SUPPORT : FLUXUS,DELTA,PASTEBIN,PASTEDROP,LINKVERTISE,REKONISE,WORKINK,MBOOST,BOOSTINK <br>
    <br>
    SOME BYPASS LINKS MAY NOT WORK CORRRECTLY BUT IT WORKS <br>
    <br>
    <br>
    DISCORD: _toshun
    `
    res.send(res_text)
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

function isUriEncoded(str) {
  const encoded = encodeURIComponent(str);
  return str !== encoded;
}
