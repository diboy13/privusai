var pdfkit_a_set=false,a_obj

function generate_payout_invoice(json){
    let p_json = JSON.parse(json.replace(/\'/g,'"'))
    const doc = new PDFDocument();
    const stream = doc.pipe(blobStream());
    var blob, invoice_data=p_json
    let invoice_lines=[
        {
            "Description":"Cloud Computing",
            "Quantity":1,
            "Unit price":(invoice_data["amount"]/100).toFixed(2).replace(/\./,','),
            "%VAT":0,
            "Without VAT":(invoice_data["amount"]/100).toFixed(2).replace(/\./,','),
            "VAT":0,
            "Total":"$"+(invoice_data["amount"]/100).toFixed(2).replace(/\./,',')
        }
    ]
    let invoice_date = convertUnixTimestampToCzechDate(parseInt(invoice_data["payout_id"].split('-')[1]))

    doc.lineWidth(80);

    // Embed a font, set the font size, and render some text
    doc
      .lineCap("butt")
      .moveTo(306, 40)
      .lineTo(612, 40)
      .fillAndStroke("red", "#fb0056")
      .fillColor("white")
      .fontSize(20)
      .font('Helvetica')
      .text(`Invoice no. ${invoice_data["show_invoice_no"]}`, 306, 32, {
        width: 306,
        align: "center",
      })
      .fontSize(24)
      .fillColor(`#fb0056`)
      .text(`Supplier`, 40, 105, {
        width: 266,
        align: "left",
      })
      .text(`Customer`, 306, 105, {
        width: 306,
        align: "left",
      })
      .fontSize(11)
      .fillColor("#000")
      .text(`
Kaštanová 1055/14
77900 Olomouc
Czech Republic
Identif. No.: 14438208
VAT Registration No.: CZ14438208`, 306+5, 135, {
        width: 306,
        align: "left",
      })
      .font('Helvetica-Bold')
      .text(`${invoice_data["supplier_company"]?invoice_data["supplier_company"]:invoice_data["supplier_name"]}`, 40+5, 135, {
        width: 306,
        align: "left",
      })
      .text(`CLORE CLOUD s.r.o.`, 306+5, 135, {
        width: 306,
        align: "left",
      })
      .font('Helvetica')
      .text(`\n${invoice_data["supplier_address"]}
${invoice_data["supplier_city_line"]}
${full_country(invoice_data["supplier_country"])}
${invoice_data["supplier_tax_id"]?`Identif. No.: ${removeNonNumericCharacters(invoice_data["supplier_tax_id"])}`:''}${(is_eu(invoice_data["supplier_country"]) && invoice_data["supplier_tax_id"])?`\nVAT Registration No.: ${invoice_data["supplier_country"].toUpperCase()}${removeNonNumericCharacters(invoice_data["supplier_tax_id"])}`:''}`, 40+5, 135, {
    width: 306,
    align: "left",
  })
      .lineCap('butt')
      .strokeColor("#f5f5f5")
      .lineWidth(22)
      .moveTo(35, 228+11)
      .lineTo(230, 228+11)
      .stroke()
      .lineWidth(70)
      .moveTo(0, 250+35)
      .lineTo(612, 250+35)
      .stroke()
      .strokeColor("#e2e2e2")
      .lineWidth(1)
      .moveTo(0, 250)
      .lineTo(612, 250)
      .stroke()
      .moveTo(0, 250+70)
      .lineTo(612, 250+70)
      .stroke()
      .moveTo(35, 250)
      .lineTo(35, 228)
      .stroke()
      .moveTo(230, 250)
      .lineTo(230, 228)
      .stroke()
      .moveTo(230, 228)
      .lineTo(35, 228)
      .stroke()
      .fillColor('#666')
      .text(`Payment method: Stripe Connect`, 35, 235, {
          width: 230-35,
          align: "center",
        })
      .fillColor('#000')
      .fontSize(12)
      .font('Helvetica-Bold')
      .text(`INVOICE DATE`, 50, 250+20, {
        width:100,
        align:"left"
      })
      .text(`DUE DATE`, 273, 250+20, {
        width:100,
        align:"left"
      })
      .text(`TOTAL DUE`, 496, 250+20, {
        width:100,
        align:"left"
      })
      .font('Helvetica')
      .text(invoice_date, 50, 250+40, {
        width:100,
        align:"left"
      })
      .text(invoice_date, 273, 250+40, {
        width:100,
        align:"left"
      })
      .text(`$ ${(invoice_data["amount"]/100).toFixed(2).replace(/\./,',')}`, 496, 250+40, {
        width:100,
        align:"left"
      })
      .strokeColor("#fb0056")
      .lineWidth(35)
      .moveTo(0, 360)
      .lineTo(612, 360)
      .stroke()
      .fillColor("#fff")
      .text(`Description`, 50, 356, {
        width:100,
        align:"left"
      })
      .fillColor("#000")
      .fontSize(16)
      .text(`Total due:`, 400, 356+(35*invoice_lines.length)+54, {
        width:100,
        align:"left"
      })
      .font("Courier-Bold")
      .text(`$${(invoice_data["amount"]/100).toFixed(2).replace(/\./,',')}`, 480, 356+(35*invoice_lines.length)+54, {
        width:100,
        align:"right"
      })
      .lineWidth(2)
      .lineCap('butt')
      .strokeColor("#000")
      .moveTo(395, 356+(35*invoice_lines.length)+54+20)
      .lineTo(585, 356+(35*invoice_lines.length)+54+20)
      .stroke()
      .fillColor("red")
      .font("Helvetica")
      .fontSize(13)
      .text(`Do not pay, paid on ${invoice_date}`, 395, 356+(35*invoice_lines.length)+54+30, {
        width:190,
        align:"center"
      })
      .fontSize(12)

    let is_p=["Quantity","Unit price", "Total"], char_length=7
    if(is_eu(invoice_data["supplier_country"])){
        is_p = ["Quantity", "Unit price", "%VAT","Without VAT","VAT","Total"];
    }
    let is_pp=[]

    let last_r_pos=562
    for(var i=is_p.length-1;i>=0;i--){
        last_r_pos = last_r_pos-(is_p[i].length*char_length)-10
        is_pp.push(last_r_pos)
        doc.fillColor("#fff")
        .text(is_p[i], last_r_pos, 356, {
            width:100,
            align:"left"
        })
    }
    for(var i=0;i<invoice_lines.length;i++){
        let c_invoice_line = invoice_lines[i]
        doc.fillColor("#000")
        .text(c_invoice_line["Description"], 50, 356+(35*(i+1)), {
            width:100,
            align:"left"
        })
        .strokeColor("#000")
        .lineWidth(1)
        .moveTo(0, 360+(35/2)+(35*(i+1)))
        .lineTo(612, 360+(35/2)+(35*(i+1)))
        .stroke()
        for(var x=0;x<Object.keys(c_invoice_line).length;x++){
            let c_var = Object.keys(c_invoice_line)[x]
            for(var z=is_p.length-1;z>=0;z--){
                if(is_p[z]==c_var){
                    doc.fillColor("#000")
                    .text(c_invoice_line[c_var], is_pp[is_p.length-1-z], 356+(35*(i+1)), {
                        width:100,
                        align:"left"
                    })
                }
            }
        }
    }
    if(invoice_data["extra_msg"]){
        doc.font("arial").text(invoice_data["extra_msg"], 50, 630, {
          width: 512,
          align: "left",
        });
    }
    // Finalize PDF file
    doc.end();

    stream.on("finish", function () {
      // get a blob you can do whatever you like with
      blob = stream.toBlob("application/pdf");
      console.log("HAS BLOB")

      if(!pdfkit_a_set){
        a_obj = document.createElement("a");
        document.getElementById("pdfkit-tmp").appendChild(a_obj);
        a_obj.style = "display: none";
        pdfkit_a_set=true
      }
      if (!blob) return;
      var url = window.URL.createObjectURL(blob);
      a_obj.href = url;
      a_obj.download = (p_json["show_invoice_no"]?p_json["show_invoice_no"]:'-')+".pdf";
      a_obj.click();
      window.URL.revokeObjectURL(url);
    });
}

function removeNonNumericCharacters(str) {
  return str.replace(/[^0-9]/g, "");
}

function full_country(alpha2){
    const countryCodes = {
    af: 'Afghanistan',
    ax: 'Åland Islands',
    al: 'Albania',
    dz: 'Algeria',
    as: 'American Samoa',
    ad: 'Andorra',
    ao: 'Angola',
    ai: 'Anguilla',
    aq: 'Antarctica',
    ag: 'Antigua and Barbuda',
    ar: 'Argentina',
    am: 'Armenia',
    aw: 'Aruba',
    au: 'Australia',
    at: 'Austria',
    az: 'Azerbaijan',
    bs: 'Bahamas',
    bh: 'Bahrain',
    bd: 'Bangladesh',
    bb: 'Barbados',
    by: 'Belarus',
    be: 'Belgium',
    bz: 'Belize',
    bj: 'Benin',
    bm: 'Bermuda',
    bt: 'Bhutan',
    bo: 'Bolivia',
    bq: 'Bonaire, Sint Eustatius and Saba',
    ba: 'Bosnia and Herzegovina',
    bw: 'Botswana',
    bv: 'Bouvet Island',
    br: 'Brazil',
    io: 'British Indian Ocean Territory',
    bn: 'Brunei Darussalam',
    bg: 'Bulgaria',
    bf: 'Burkina Faso',
    bi: 'Burundi',
    cv: 'Cabo Verde',
    kh: 'Cambodia',
    cm: 'Cameroon',
    ca: 'Canada',
    ky: 'Cayman Islands',
    cf: 'Central African Republic',
    td: 'Chad',
    cl: 'Chile',
    cn: 'China',
    cx: 'Christmas Island',
    cc: 'Cocos (Keeling) Islands',
    co: 'Colombia',
    km: 'Comoros',
    cg: 'Congo',
    cd: 'Congo, Democratic Republic of the',
    ck: 'Cook Islands',
    cr: 'Costa Rica',
    ci: 'Côte d\'Ivoire',
    hr: 'Croatia',
    cu: 'Cuba',
    cw: 'Curaçao',
    cy: 'Cyprus',
    cz: 'Czech Republic',
    dk: 'Denmark',
    dj: 'Djibouti',
    dm: 'Dominica',
    do: 'Dominican Republic',
    ec: 'Ecuador',
    eg: 'Egypt',
    sv: 'El Salvador',
    gq: 'Equatorial Guinea',
    er: 'Eritrea',
    ee: 'Estonia',
    sz: 'Eswatini',
    et: 'Ethiopia',
    fk: 'Falkland Islands (Malvinas)',
    fo: 'Faroe Islands',
    fj: 'Fiji',
    fi: 'Finland',
    fr: 'France',
    gf: 'French Guiana',
    pf: 'French Polynesia',
    tf: 'French Southern Territories',
    ga: 'Gabon',
    gm: 'Gambia',
    ge: 'Georgia',
    de: 'Germany',
    gh: 'Ghana',
    gi: 'Gibraltar',
    gr: 'Greece',
    gl: 'Greenland',
    gd: 'Grenada',
    gp: 'Guadeloupe',
    gu: 'Guam',
    gt: 'Guatemala',
    gg: 'Guernsey',
    gn: 'Guinea',
    gw: 'Guinea-Bissau',
    gy: 'Guyana',
    ht: 'Haiti',
    hm: 'Heard Island and McDonald Islands',
    va: 'Holy See',
    hn: 'Honduras',
    hk: 'Hong Kong',
    hu: 'Hungary',
    is: 'Iceland',
    in: 'India',
    id: 'Indonesia',
    ir: 'Iran',
    iq: 'Iraq',
    ie: 'Ireland',
    im: 'Isle of Man',
    il: 'Israel',
    it: 'Italy',
    jm: 'Jamaica',
    jp: 'Japan',
    je: 'Jersey',
    jo: 'Jordan',
    kz: 'Kazakhstan',
    ke: 'Kenya',
    ki: 'Kiribati',
    kp: 'Korea, Democratic People\'s Republic of',
    kr: 'Korea, Republic of',
    kw: 'Kuwait',
    kg: 'Kyrgyzstan',
    la: 'Lao People\'s Democratic Republic',
    lv: 'Latvia',
    lb: 'Lebanon',
    ls: 'Lesotho',
    lr: 'Liberia',
    ly: 'Libya',
    li: 'Liechtenstein',
    lt: 'Lithuania',
    lu: 'Luxembourg',
    mo: 'Macao',
    mg: 'Madagascar',
    mw: 'Malawi',
    my: 'Malaysia',
    mv: 'Maldives',
    ml: 'Mali',
    mt: 'Malta',
    mh: 'Marshall Islands',
    mq: 'Martinique',
    mr: 'Mauritania',
    mu: 'Mauritius',
    yt: 'Mayotte',
    mx: 'Mexico',
    fm: 'Micronesia (Federated States of)',
    md: 'Moldova',
    mc: 'Monaco',
    mn: 'Mongolia',
    me: 'Montenegro',
    ms: 'Montserrat',
    ma: 'Morocco',
    mz: 'Mozambique',
    mm: 'Myanmar',
    na: 'Namibia',
    nr: 'Nauru',
    np: 'Nepal',
    nl: 'Netherlands',
    nc: 'New Caledonia',
    nz: 'New Zealand',
    ni: 'Nicaragua',
    ne: 'Niger',
    ng: 'Nigeria',
    nu: 'Niue',
    nf: 'Norfolk Island',
    mp: 'Northern Mariana Islands',
    no: 'Norway',
    om: 'Oman',
    pk: 'Pakistan',
    pw: 'Palau',
    ps: 'Palestine, State of',
    pa: 'Panama',
    pg: 'Papua New Guinea',
    py: 'Paraguay',
    pe: 'Peru',
    ph: 'Philippines',
    pn: 'Pitcairn',
    pl: 'Poland',
    pt: 'Portugal',
    pr: 'Puerto Rico',
    qa: 'Qatar',
    re: 'Réunion',
    ro: 'Romania',
    ru: 'Russian Federation',
    rw: 'Rwanda',
    bl: 'Saint Barthélemy',
    sh: 'Saint Helena, Ascension and Tristan da Cunha',
    kn: 'Saint Kitts and Nevis',
    lc: 'Saint Lucia',
    mf: 'Saint Martin (French part)',
    pm: 'Saint Pierre and Miquelon',
    vc: 'Saint Vincent and the Grenadines',
    ws: 'Samoa',
    sm: 'San Marino',
    st: 'Sao Tome and Principe',
    sa: 'Saudi Arabia',
    sn: 'Senegal',
    rs: 'Serbia',
    sc: 'Seychelles',
    sl: 'Sierra Leone',
    sg: 'Singapore',
    sx: 'Sint Maarten (Dutch part)',
    sk: 'Slovakia',
    si: 'Slovenia',
    sb: 'Solomon Islands',
    so: 'Somalia',
    za: 'South Africa',
    gs: 'South Georgia and the South Sandwich Islands',
    ss: 'South Sudan',
    es: 'Spain',
    lk: 'Sri Lanka',
    sd: 'Sudan',
    sr: 'Suriname',
    sj: 'Svalbard and Jan Mayen',
    se: 'Sweden',
    ch: 'Switzerland',
    sy: 'Syrian Arab Republic',
    tw: 'Taiwan',
    tj: 'Tajikistan',
    tz: 'Tanzania',
    th: 'Thailand',
    tl: 'Timor-Leste',
    tg: 'Togo',
    tk: 'Tokelau',
    to: 'Tonga',
    tt: 'Trinidad and Tobago',
    tn: 'Tunisia',
    tr: 'Turkey',
    tm: 'Turkmenistan',
    tc: 'Turks and Caicos Islands',
    tv: 'Tuvalu',
    ug: 'Uganda',
    ua: 'Ukraine',
    ae: 'United Arab Emirates',
    gb: 'United Kingdom',
    um: 'United States Minor Outlying Islands',
    us: 'United States of America',
    uy: 'Uruguay',
    uz: 'Uzbekistan',
    vu: 'Vanuatu',
    ve: 'Venezuela',
    vn: 'Viet Nam',
    vg: 'Virgin Islands (British)',
    vi: 'Virgin Islands (U.S.)',
    wf: 'Wallis and Futuna',
    eh: 'Western Sahara',
    ye: 'Yemen',
    zm: 'Zambia',
    zw: 'Zimbabwe'
  };

  return countryCodes[alpha2.toLowerCase()] || 'Unknown';
}
function is_eu(alpha2){
    const euCountries = ['at', 'be', 'bg', 'hr', 'cy', 'cz', 'dk', 'ee', 'fi', 'fr', 'de', 'gr', 'hu', 'ie', 'it', 'lv', 'lt', 'lu', 'mt', 'nl', 'pl', 'pt', 'ro', 'sk', 'si', 'es', 'se'];

  return euCountries.includes(alpha2.toLowerCase());
}

function convertUnixTimestampToCzechDate(unixTimestamp) {
  // Create a new Date object with the given Unix timestamp
  const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds

  // Get the date components
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear().toString();

  // Return the formatted date string
  return `${day}.${month}.${year}`;
}