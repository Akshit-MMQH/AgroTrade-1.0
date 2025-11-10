const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const CROPS_FILE = path.resolve(__dirname, 'data/crops.json');

app.post('/api/crops/add', (req, res) => {
  try {
    const { cropName, quantity, minPrice, location, farmerId, farmerName } = req.body;

    if (!cropName || !quantity || !minPrice || !location || !farmerId) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const cropId = `crop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const newCrop = {
      id: cropId,
      cropName,
      quantity: parseFloat(quantity),
      minPrice: parseFloat(minPrice),
      currentPrice: parseFloat(minPrice),
      location,
      farmerId,
      farmerName: farmerName || 'Unknown Farmer',
      status: 'active',
      bids: [],
      createdAt: new Date().toISOString()
    };

    let crops = [];
    if (fs.existsSync(CROPS_FILE)) {
      crops = JSON.parse(fs.readFileSync(CROPS_FILE, 'utf8'));
    }
    
    crops.push(newCrop);
    fs.writeFileSync(CROPS_FILE, JSON.stringify(crops, null, 2));
    
    res.json({ success: true, crop: newCrop });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/crops', (req, res) => {
  try {
    if (!fs.existsSync(CROPS_FILE)) {
      return res.json({ success: true, crops: [] });
    }
    
    let crops = JSON.parse(fs.readFileSync(CROPS_FILE, 'utf8'));
    res.json({ success: true, crops });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/crops/bid', (req, res) => {
  try {
    const { cropId, bidAmount, traderId, traderName } = req.body;
    
    if (!cropId || !bidAmount || !traderId) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (!fs.existsSync(CROPS_FILE)) {
      return res.status(404).json({ success: false, message: 'No crops found' });
    }
    
    let crops = JSON.parse(fs.readFileSync(CROPS_FILE, 'utf8'));
    const cropIndex = crops.findIndex(c => c.id === cropId);
    
    if (cropIndex === -1) {
      return res.status(404).json({ success: false, message: 'Crop not found' });
    }
    
    const crop = crops[cropIndex];
    
    if (crop.status !== 'active') {
      return res.status(400).json({ success: false, message: 'Auction is closed' });
    }
    
    const bidAmountNum = parseFloat(bidAmount);
    if (bidAmountNum <= crop.currentPrice) {
      return res.status(400).json({ success: false, message: `Bid must be higher than current price ₹${crop.currentPrice}` });
    }
    
    const newBid = {
      id: `bid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      traderId,
      traderName: traderName || 'Unknown Trader',
      amount: bidAmountNum,
      timestamp: new Date().toISOString()
    };
    
    crop.bids.push(newBid);
    crop.currentPrice = bidAmountNum;
    crop.highestBidder = { traderId, traderName: newBid.traderName };
    
    crops[cropIndex] = crop;
    fs.writeFileSync(CROPS_FILE, JSON.stringify(crops, null, 2));
    
    res.json({ success: true, bid: newBid, crop });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/crops/end', (req, res) => {
  try {
    const { cropId, farmerId } = req.body;
    
    if (!cropId || !farmerId) {
      return res.status(400).json({ success: false, message: 'Missing cropId or farmerId' });
    }

    if (!fs.existsSync(CROPS_FILE)) {
      return res.status(404).json({ success: false, message: 'No crops found' });
    }
    
    let crops = JSON.parse(fs.readFileSync(CROPS_FILE, 'utf8'));
    const cropIndex = crops.findIndex(c => c.id === cropId && c.farmerId === farmerId);
    
    if (cropIndex === -1) {
      return res.status(404).json({ success: false, message: 'Crop not found or not owned by farmer' });
    }
    
    crops[cropIndex].status = 'closed';
    fs.writeFileSync(CROPS_FILE, JSON.stringify(crops, null, 2));
    
    res.json({ success: true, message: 'Auction ended successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});