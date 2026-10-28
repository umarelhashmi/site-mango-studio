<?php
/**
 * Live Google Maps Reviews Sync & Proxy for MANGO Hair Studio Lake Nona
 * Place CID: 0x88e7618447c3ec51:0x2b90a20db9fd6eeb
 * Automatically pulls the newest reviews directly from Google Maps and merges
 * with local high-res cached reviews/photos so any new review appears live.
 */

if (isset($_GET['proxy_img'])) {
    $imgUrl = $_GET['proxy_img'];
    if (preg_match('#^https://lh[0-9]\.googleusercontent\.com/#i', $imgUrl)) {
        $ch = curl_init($imgUrl);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_TIMEOUT => 8,
            CURLOPT_USERAGENT => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            CURLOPT_SSL_VERIFYPEER => false,
        ]);
        $bin = curl_exec($ch);
        $ct = curl_getinfo($ch, CURLINFO_CONTENT_TYPE) ?: 'image/jpeg';
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($code === 200 && $bin) {
            header('Content-Type: ' . $ct);
            header('Cache-Control: public, max-age=86400');
            echo $bin;
            exit;
        }
    }
    http_response_code(404);
    exit;
}

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: public, max-age=120');

$baseFile = __DIR__ . '/../data/google-reviews.json';
$baseData = file_exists($baseFile) ? json_decode(file_get_contents($baseFile), true) : [
    'placeName' => 'Mango Hair Studio Lake Nona',
    'rating' => 4.9,
    'totalReviews' => 687,
    'reviews' => []
];

$cacheFile = sys_get_temp_dir() . '/mango_hair_gmaps_live_v1.json';
$cacheTtl = 180; // Refresh from Google Maps every 3 minutes

if (!isset($_GET['force']) && file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheTtl)) {
    $cached = json_decode(file_get_contents($cacheFile), true);
    if (is_array($cached) && !empty($cached['reviews'])) {
        $cached['liveSync']['fromCache'] = true;
        echo json_encode($cached, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }
}

$gmapsUrlNewest = 'https://www.google.com/maps/preview/place?authuser=0&hl=en&gl=us&q=Mango+Hair+Studio+Lake+Nona&pb=%211m17%211s0x88e7618447c3ec51%3A0x2b90a20db9fd6eeb%212sMango+Hair+Studio+Lake+Nona%213m8%211m3%211d3508.5410074676515%212d-81.2556082%213d28.4331035%213m2%211i1024%212i768%214f13.1%214m2%213d28.4331035%214d-81.2556082%2115m2%211m1%214s%2Fg%2F11h7g4kdgz%2112m4%212m3%211i360%212i120%214i8%2113m57%212m2%211i203%212i100%213m2%212i4%215b1%216m6%211m2%211i86%212i86%211m2%211i408%212i240%217m33%211m3%211e1%212b0%213e3%211m3%211e2%212b1%213e2%211m3%211e2%212b0%213e3%211m3%211e8%212b0%213e3%211m3%211e10%212b0%213e3%211m3%211e10%212b1%213e2%211m3%211e10%212b0%213e4%211m3%211e9%212b1%213e2%212b1%219b0%2115m8%211m7%211m2%211m1%211e2%212m2%211i195%212i195%213i20%2114m3%211s1YHhaobxIZ2Ywt0PuZPE6QQ%217e81%2115i10112%2115m108%211m26%2113m9%212b1%213b1%214b1%216i1%218b1%219b1%2114b1%2120b1%2125b1%2118m15%213b1%214b1%215b1%216b1%2113b1%2114b1%2117b1%2121b1%2122b1%2130b1%2132b1%2133m1%211b1%2134b1%2136e2%2110m1%218e3%2111m1%213e1%2117b1%2120m2%211e3%211e6%2124b1%2125b1%2126b1%2127b1%2129b1%2130m1%212b1%2136b1%2137b1%2139m3%212m2%212i1%213i1%2143b1%2152b1%2154m1%211b1%2155b1%2156m1%211b1%2161m2%211m1%211e1%2165m5%213m4%211m3%211m2%211i224%212i298%2172m22%211m8%212b1%215b1%217b1%2112m4%211b1%212b1%214m1%211e1%214b1%218m10%211m6%214m1%211e1%214m1%211e3%214m1%211e4%213sother_user_google_review_posts__and__hotel_and_vr_partner_review_posts%216m1%211e2%219b1%2189b1%2190m2%211m1%211e2%2198m3%211b1%212b1%213b1%21103b1%21113b1%21114m3%211b1%212m1%211b1%21117b1%21122m1%211b1%21126b1%21127b1%21128m1%211b1%2121m0%2122m1%211e81%2130m8%213b1%216m2%211b1%212b1%217m2%211e3%212b1%219b1%2134m5%217b1%2110b1%2114b1%2115m1%211b0%2137i801';

function fetchGmapsPlace($url) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT => 5,
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        CURLOPT_SSL_VERIFYPEER => false,
    ]);
    $raw = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($code !== 200 || !$raw) return null;
    $parts = explode("\n", $raw, 2);
    $jsonStr = count($parts) > 1 ? $parts[1] : $raw;
    return json_decode($jsonStr, true);
}

$liveParsed = fetchGmapsPlace($gmapsUrlNewest);
$liveAddedCount = 0;

if (is_array($liveParsed) && isset($liveParsed[6])) {
    $placeNode = $liveParsed[6];
    if (isset($placeNode[4][7]) && is_numeric($placeNode[4][7])) {
        $baseData['rating'] = (float)$placeNode[4][7];
    }
    if (isset($placeNode[4][8]) && is_numeric($placeNode[4][8])) {
        $baseData['totalReviews'] = (int)$placeNode[4][8];
    }

    $existingById = [];
    foreach ($baseData['reviews'] as $idx => $rev) {
        if (!empty($rev['reviewId'])) {
            $existingById[$rev['reviewId']] = $idx;
        }
    }

    $rawReviews = $placeNode[175][9][0][0] ?? [];
    $newlyDiscovered = [];

    foreach ($rawReviews as $wrapper) {
        $r = $wrapper[0] ?? null;
        if (!$r || empty($r[0])) continue;
        $rid = $r[0];
        $author = $r[1][4][5][0] ?? 'Google Reviewer';
        $avatarUrl = $r[1][4][5][1] ?? '';
        $profileUrl = $r[1][4][5][2][0] ?? 'https://www.google.com/maps/place/Mango+Hair+Studio+Lake+Nona/';
        $badge = $r[1][4][5][10][0] ?? 'Verified Google Review';
        $relDate = $r[1][6] ?? 'Recently';
        $tsCreated = $r[1][2] ?? 0;
        $rating = (int)($r[2][0][0] ?? 5);
        $text = $r[2][15][0][0] ?? '';
        $ownerReply = $r[3][14][0][0] ?? null;

        if (isset($existingById[$rid])) {
            $i = $existingById[$rid];
            $baseData['reviews'][$i]['relativeDate'] = $relDate;
            if ($text) {
                $baseData['reviews'][$i]['text'] = $text;
            }
            continue;
        }

        // Brand-new review posted on Google Maps since initial snapshot!
        $photos = [];
        if (!empty($r[2][2]) && is_array($r[2][2])) {
            foreach ($r[2][2] as $ph) {
                $pUrl = $ph[1][6][0] ?? null;
                if ($pUrl) {
                    $hiUrl = preg_replace('/=w\d+-h\d+[^&]*/', '=w1000-h1000-k-no', $pUrl);
                    $photos[] = '/api/google-reviews.php?proxy_img=' . urlencode($hiUrl);
                }
            }
        }

        $proxiedAvatar = $avatarUrl ? ('/api/google-reviews.php?proxy_img=' . urlencode($avatarUrl)) : null;

        $newlyDiscovered[] = [
            'reviewId' => $rid,
            'reviewerName' => $author,
            'avatar' => $proxiedAvatar,
            'badge' => $badge,
            'rating' => $rating,
            'relativeDate' => $relDate,
            'timestampMicroseconds' => $tsCreated,
            'sortBucket' => 'newest',
            'text' => $text,
            'ownerResponse' => $ownerReply,
            'photos' => $photos,
            'profileUrl' => $profileUrl,
            'isLiveNew' => true
        ];
        $liveAddedCount++;
    }

    if (!empty($newlyDiscovered)) {
        $baseData['reviews'] = array_merge($newlyDiscovered, $baseData['reviews']);
    }
}

$baseData['liveSync'] = [
    'status' => is_array($liveParsed) ? 'connected' : 'fallback_local',
    'syncedAt' => gmdate('c'),
    'newReviewsMerged' => $liveAddedCount,
    'source' => 'Google Maps Direct RPC (0x88e7618447c3ec51:0x2b90a20db9fd6eeb)'
];

@file_put_contents($cacheFile, json_encode($baseData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
echo json_encode($baseData, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
