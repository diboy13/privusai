const clore_min_pricing_limit = CONFIG_GLOBAL["marketplace_pricing_limit"]["CLORE-Blockchain"]["min"];
const bitcoin_min_pricing_limit = CONFIG_GLOBAL["marketplace_pricing_limit"]["bitcoin"]["min"];
const clore_max_pricing_limit = CONFIG_GLOBAL["marketplace_pricing_limit"]["CLORE-Blockchain"]["max"];
const bitcoin_max_pricing_limit = CONFIG_GLOBAL["marketplace_pricing_limit"]["bitcoin"]["max"];
const usd_max_pricing_limit = CONFIG_GLOBAL["marketplace_pricing_limit"]["usd"]["max"];
const usd_min_pricing_limit = CONFIG_GLOBAL["marketplace_pricing_limit"]["usd"]["min"];
const server_usd_pricing_enabled = CONFIG_GLOBAL["featureFlags"]["server_usd_pricing"];
const rent_by_template_enabled = CONFIG_GLOBAL["featureFlags"]["rent_by_template"];
const mass_price_change_enabled = CONFIG_GLOBAL["featureFlags"]["mass_price_change_enabled"];

const init_youtube = `<iframe width="100%" height="auto" src="https://www.youtube-nocookie.com/embed/v_FGRamDKCQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
const monokai_theme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    {
      background: '272822',
      token: '',
    },
    {
      foreground: '75715e',
      token: 'comment',
    },
    {
      foreground: 'e6db74',
      token: 'string',
    },
    {
      foreground: 'ae81ff',
      token: 'constant.numeric',
    },
    {
      foreground: 'ae81ff',
      token: 'constant.language',
    },
    {
      foreground: 'ae81ff',
      token: 'constant.character',
    },
    {
      foreground: 'ae81ff',
      token: 'constant.other',
    },
    {
      foreground: 'f92672',
      token: 'keyword',
    },
    {
      foreground: 'f92672',
      token: 'storage',
    },
    {
      foreground: '66d9ef',
      fontStyle: 'italic',
      token: 'storage.type',
    },
    {
      foreground: 'a6e22e',
      fontStyle: 'underline',
      token: 'entity.name.class',
    },
    {
      foreground: 'a6e22e',
      fontStyle: 'italic underline',
      token: 'entity.other.inherited-class',
    },
    {
      foreground: 'a6e22e',
      token: 'entity.name.function',
    },
    {
      foreground: 'fd971f',
      fontStyle: 'italic',
      token: 'variable.parameter',
    },
    {
      foreground: 'f92672',
      token: 'entity.name.tag',
    },
    {
      foreground: 'a6e22e',
      token: 'entity.other.attribute-name',
    },
    {
      foreground: '66d9ef',
      token: 'support.function',
    },
    {
      foreground: '66d9ef',
      token: 'support.constant',
    },
    {
      foreground: '66d9ef',
      fontStyle: 'italic',
      token: 'support.type',
    },
    {
      foreground: '66d9ef',
      fontStyle: 'italic',
      token: 'support.class',
    },
    {
      foreground: 'f8f8f0',
      background: 'f92672',
      token: 'invalid',
    },
    {
      foreground: 'f8f8f0',
      background: 'ae81ff',
      token: 'invalid.deprecated',
    },
    {
      foreground: 'cfcfc2',
      token: 'meta.structure.dictionary.json string.quoted.double.json',
    },
    {
      foreground: '75715e',
      token: 'meta.diff',
    },
    {
      foreground: '75715e',
      token: 'meta.diff.header',
    },
    {
      foreground: 'f92672',
      token: 'markup.deleted',
    },
    {
      foreground: 'a6e22e',
      token: 'markup.inserted',
    },
    {
      foreground: 'e6db74',
      token: 'markup.changed',
    },
    {
      foreground: 'ae81ffa0',
      token: 'constant.numeric.line-number.find-in-files - match',
    },
    {
      foreground: 'e6db74',
      token: 'entity.name.filename.find-in-files',
    },
  ],
  colors: {
    'editor.foreground': '#F8F8F2',
    'editor.background': '#272822',
    'editor.selectionBackground': '#49483E',
    'editor.lineHighlightBackground': '#3E3D32',
    'editorCursor.foreground': '#F8F8F0',
    'editorWhitespace.foreground': '#3B3A32',
    'editorIndentGuide.activeBackground': '#9D550FB0',
    'editor.selectionHighlightBorder': '#222218',
  },
};
const machine_rating = true;
const default_images = [
  {
    show_name: 'cloreai/ubuntu20.04-jupyter',
    image: 'cloreai/ubuntu20.04-jupyter',
    ports: { 22: 'tcp', 8888: 'http' },
    jupyter: true,
    ssh: true,
  },
  {
    show_name: 'cloreai/hiveos',
    image: 'cloreai/hiveos',
    ports: {},
    jupyter: false,
    ssh: false,
  },
];
const v3_images = {
  'General Purpose': [
    {
      name: 'Ubuntu Jupyter',
      official: true,
      image: 'cloreai/ubuntu20.04-jupyter',
      logo: 'jupyter.svg',
      'default-tag': '',
      tags: [],
      forwarding: {
        22: 'tcp',
        8888: 'http',
      },
      mandatory_env: [
        {
          env: 'JUPYTER_TOKEN',
          show_name: 'Jupyter Password',
          default: '',
          default_random: 18,
        },
      ],
      clore_ssh: true,
    },
    {
      name: 'Jupyter Lab + VS Code',
      official: true,
      image: 'cloreai/ml-tools:0.1',
      logo: 'jupyter-lob.svg',
      'default-tag': '',
      tags: [],
      forwarding: {
        22: 'tcp',
        80: 'http',
      },
      mandatory_env: [
        {
          env: 'WEBUI_PASSWORD',
          show_name: 'WebUI Password',
          default: '',
          default_random: 18,
        },
      ],
      clore_ssh: true,
    },
  ],
  'Artificial Intelligence': [
    {
      name: 'Text Generation WebUI',
      official: true,
      image: 'cloreai/oobabooga:1.5',
      logo: 'webUi.svg',
      'default-tag': '',
      tags: [],
      forwarding: {
        22: 'tcp',
        80: 'http',
      },
      mandatory_env: [
        {
          env: 'WEBUI_PASSWORD',
          show_name: 'WebUI Password',
          default: '',
          default_random: 18,
        },
      ],
      clore_ssh: true,
    },
    {
      name: 'PyTorch',
      official: true,
      image: 'cloreai/torch:2.0.1',
      logo: 'pytorch.svg',
      'default-tag': '',
      tags: [],
      forwarding: {
        22: 'tcp',
        80: 'http',
      },
      mandatory_env: [
        {
          env: 'WEBUI_PASSWORD',
          show_name: 'WebUI Password',
          default: '',
          default_random: 18,
        },
      ],
      clore_ssh: true,
    },
    {
      name: 'Stable Diffusion WebUI',
      official: true,
      image: 'cloreai/stable-diffusion-webui:latest',
      logo: 'stoble.svg',
      'default-tag': '',
      tags: [],
      forwarding: {
        22: 'tcp',
        80: 'http',
      },
      mandatory_env: [
        {
          env: 'WEBUI_PASSWORD',
          show_name: 'WebUI Password',
          default: '',
          default_random: 18,
        },
      ],
      clore_ssh: true,
    },
  ],
  'Blockchain Processing': [
    {
      name: 'Hive OS',
      official: true,
      image: 'cloreai/hiveos',
      logo: 'hiveos.svg',
      'default-tag': '0.1',
      tags: [],
      forwarding: {},
      hive: true,
    },
    {
      name: 'DynexSolve',
      official: true,
      image: 'cloreai/dynexsolve:0.1',
      logo: 'dynex.svg',
      'default-tag': '',
      tags: [],
      forwarding: {},
      mandatory_env: [
        {
          env: 'POOL_URL',
          show_name: 'Pool address',
          default: '',
        },
        {
          env: 'POOL_PORT',
          show_name: 'Pool port',
          default: '',
        },
        {
          env: 'POOL_PASSWORD',
          show_name: 'Pool password',
          default: '',
        },
        {
          env: 'POOL_WALLET',
          show_name: 'Pool username',
          default: '',
        },
        {
          env: 'MALLOB',
          show_name: 'MALLOB endpoint',
          default: '',
        },
      ],
    },
    {
      name: 'MemeHash',
      official: true,
      image: 'cloreai/memehash',
      logo: 'webUi.svg',
      'default-tag': '',
      tags: [],
      forwarding: {},
      mandatory_env: [
        {
          env: 'POOL_URL',
          show_name: 'Pool address',
          default: '',
        },
        {
          env: 'POOL_PORT',
          show_name: 'Pool port',
          default: '',
        },
        {
          env: 'POOL_PASSWORD',
          show_name: 'Pool password',
          default: '',
        },
        {
          env: 'POOL_WALLET',
          show_name: 'Pool username',
          default: '',
        },
      ],
    },
  ],
};
const current_backend_version = 6;
const simple_mining = {
  algos: {
    etchash: ['bzminer'],
    ethash: ['bzminer'],
    kawpow: ['bzminer'],
    kaspa: ['bzminer'],
    ergo: ['bzminer'],
    'Mining Disabled': [],
  },
  miners: {
    bzminer: `/miners/bzminer -a "%algo%" -w "%wallet%" -p "%pool%"`,
  },
};
const clore_mining_image_prefix = 'cloreai/automining';
const glob_hoster_fiat_enabled = false;
const glob_gpu_types = {
  41: {
    show_n: 'RTX 4090',
    ti: false,
    rq: 'rtx 4090',
  },
  42: {
    show_n: 'RTX 4080 SUPER',
    ti: false,
    rq: 'rtx 4080 super',
  },
  43: {
    show_n: 'RTX 4080',
    ti: false,
    rq: 'rtx 4080',
  },
  44: {
    show_n: 'RTX 4070 Ti SUPER',
    ti: true,
    rq: 'rtx 4070 ti super',
  },
  45: {
    show_n: 'RTX 4070 Ti',
    ti: true,
    rq: 'rtx 4070 ti',
  },
  46: {
    show_n: 'RTX 4070 SUPER',
    ti: false,
    rq: 'rtx 4070 super',
  },
  47: {
    show_n: 'RTX 4070',
    ti: false,
    rq: 'rtx 4070',
  },
  48: {
    show_n: 'RTX 4060 Ti',
    ti: true,
    rq: 'rtx 4060 ti',
  },
  49: {
    show_n: 'RTX 4060',
    ti: false,
    rq: 'rtx 4060',
  },
  50: {
    show_n: 'RTX 3090 Ti',
    ti: true,
    rq: 'rtx 3090 ti',
  },
  51: {
    show_n: 'RTX 3090',
    ti: false,
    rq: 'rtx 3090',
  },
  52: {
    show_n: 'RTX 3080 Ti',
    ti: true,
    rq: 'rtx 3080 ti',
  },
  53: {
    show_n: 'RTX 3080',
    ti: false,
    rq: 'rtx 3080',
  },
  54: {
    show_n: 'RTX 3080 Laptop GPU',
    ti: false,
    rq: 'rtx 3080 laptop',
  },
  55: {
    show_n: 'RTX 3070 Ti',
    ti: true,
    rq: 'rtx 3070 ti',
  },
  56: {
    show_n: 'RTX 3070',
    ti: false,
    rq: 'rtx 3070',
  },
  57: {
    show_n: 'RTX 3070 Ti Laptop GPU',
    ti: true,
    rq: 'rtx 3070 ti laptop',
  },
  58: {
    show_n: 'RTX 3070 Laptop GPU',
    ti: false,
    rq: 'rtx 3070 laptop',
  },
  59: {
    show_n: 'RTX 3060 Ti',
    ti: true,
    rq: 'rtx 3060 ti',
  },
  60: {
    show_n: 'RTX 3060',
    ti: false,
    rq: 'rtx 3060',
  },
  61: {
    show_n: 'RTX 3060 Laptop GPU',
    ti: false,
    rq: 'rtx 3060 laptop',
  },
  62: {
    show_n: 'RTX 2080 Ti',
    ti: true,
    rq: 'rtx 2080 ti',
  },
  63: {
    show_n: 'RTX 2080 SUPER',
    ti: false,
    rq: 'rtx 2080 super',
  },
  64: {
    show_n: 'RTX 2080',
    ti: false,
    rq: 'rtx 2080',
  },
  65: {
    show_n: 'RTX 2070 SUPER',
    ti: false,
    rq: 'rtx 2070 super',
  },
  66: {
    show_n: 'RTX 2070',
    ti: false,
    rq: 'rtx 2070',
  },
  67: {
    show_n: 'RTX 2060 SUPER',
    ti: false,
    rq: 'rtx 2060 super',
  },
  68: {
    show_n: 'RTX 2060',
    ti: false,
    rq: 'rtx 2060',
  },
  69: {
    show_n: 'GTX 1080 Ti',
    ti: true,
    rq: 'gtx 1080 ti',
  },
  70: {
    show_n: 'GTX 1080',
    ti: false,
    rq: 'gtx 1080',
  },
  71: {
    show_n: 'GTX 1070 Ti',
    ti: true,
    rq: 'gtx 1070 ti',
  },
  72: {
    show_n: 'GTX 1070',
    ti: false,
    rq: 'gtx 1070',
  },
  73: {
    show_n: 'GTX 1660 Ti',
    ti: true,
    rq: 'gtx 1660 ti',
  },
  74: {
    show_n: 'GTX 1660 SUPER',
    ti: false,
    rq: 'gtx 1660 super',
  },
  75: {
    show_n: 'GTX 1660',
    ti: false,
    rq: 'gtx 1660',
  },
  76: {
    show_n: 'P106-100',
    ti: false,
    rq: 'p106100',
  },
  77: {
    show_n: 'P104-100',
    ti: false,
    rq: 'p104100',
  },
  78: {
    show_n: 'RTX A5000',
    ti: false,
    rq: 'rtx a5000',
  },
  79: {
    show_n: 'RTX A4000',
    ti: false,
    rq: 'rtx a4000',
  },
  80: {
    show_n: 'RTX A2000',
    ti: false,
    rq: 'rtx a2000',
  },
  81: {
    show_n: 'CMP 90HX',
    ti: false,
    rq: 'cmp 90hx',
  },
  82: {
    show_n: 'CMP 70HX',
    ti: false,
    rq: 'cmp 70hx',
  },
  83: {
    show_n: 'CMP 50HX',
    ti: false,
    rq: 'cmp 50hx',
  },
  84: {
    show_n: 'CMP 40HX',
    ti: false,
    rq: 'cmp 40hx',
  },
  85: {
    show_n: 'CMP 30HX',
    ti: false,
    rq: 'cmp 30hx',
  },
};
let show_in_usd = false;
let market_host_filter = '';
let market_rig_filter = '';
let market_host_filter_id = 'host-input-desc'
let market_rig_filter_id = 'rig-input-desc'
let pow_ticker_to_name = {}
let market_country  = ['any'] ;
let market_pci_port = 'any';
let market_pci_version = 'any';
let selected_ssh_pubkey = 0;
const glob_country_types = ["AD", "AM", "BR", "BY", "CA", "CN", "CZ", "DE", "ES", "FR", "GB", "HK", "IL", "IN", "IS", "KG", "KR", "KZ", "LT", "MD", "MX", "MY", "NL", "NO", "NZ", "PL", "RO", "RU", "SK", "TR", "TW", "UA", "US", "VN", "ZA"];
const glob_pci_port_types = [ '1', '2', '4', '8', '16'];
const glob_pci_version_types = [ '1', '2', '3', '4'];
const beautiful_algo_names = {
  autolykos2: 'AutoLykos',
  sha512_256d_radiant: 'SHA512256D',
};
const secure_cloud_packages = {
  1: {
    GPU: 'RTX 3090',
    GPU_COUNT: 1,
    CPU: '6 CORE AMD',
    RAM: '52 GB',
    PRICE: 0.25,
  },
  disk_price_gb_per_day: 0.0024,
};

let glob_ms = [];
let slimit = 0;
let ms_default_html = '';
let show_rented_servers = false;
let show_default_clocks = true;
let modalAlert = null;
let sender_status = ''
let last_open_server_status=null, last_open_server_kernel=''
let selected_template = null
let loaded_templates = [];
let hive_init_lines = null;
let rental_length = 1440;

let coins_in_usd

var default_oc_save_allowed = true

function showModalAlert() {
  modalAlert = null;
  modalAlert = new AeroModal('show-order-alert-aero');

  modalAlert.openModal();
}

function hideModalAlert() {
  if (modalAlert) {
    modalAlert.closeModal();
  }
}

function get_browser_info() {
  if (navigator.userAgent.indexOf('Firefox') != -1) {
    document.getElementById('autossh-info-body').classList.add('firefox');
  }
}

document.addEventListener('DOMContentLoaded', get_browser_info, { once: true });

function beautify_algos(algo_name) {
  if (beautiful_algo_names[algo_name]) {
    return beautiful_algo_names[algo_name];
  } else {
    return algo_name;
  }
}

function beautify_mining_speed(speed) {
  if (speed >= 1000000000000) {
    return `${(speed / 1000000000).toFixed(2)} TH/s`;
  } else if (speed >= 1000000000) {
    return `${speed / (1000000000).toFixed(2)} GH/s`;
  } else if (speed >= 1000000) {
    return `${(speed / 1000000).toFixed(2)} MH/s`;
  } else if (speed >= 1000) {
    return `${(speed / 1000).toFixed(2)} KH/s`;
  } else {
    return `${speed} H/s`;
  }
}

function render_clore_mining(server_info) {
  let has_mining_image = false,
    gpu_table = '';
  try {
    if (server_info['background_job']) {
      if (server_info['background_job']['image']) {
        if (
          server_info['background_job']['image'].substring(0, clore_mining_image_prefix.length) ===
          clore_mining_image_prefix ||
          server_info['background_job']['image'] === '€'
        )
          has_mining_image = true;
      }
    }
    let ms = server_info['ms'] ? server_info['ms'] : {};
    if (server_info['specs'] && server_info['specs']['gpu']) {
      let gpu_cnt = parseInt(server_info['specs']['gpu'].split(' ')[0]);
      if (gpu_cnt > 16) gpu_cnt = 16;
      for (let i = 0; i < gpu_cnt; i++) {
        let algo_html = 'N/A',
          algo_speed = 'N/A',
          gpu_power = 'N/A',
          gpu_temperature = 'N/A';
        if (ms[`gpu${i}`]) {
          try {
            let algo_list = Object.keys(ms[`gpu${i}`]['hashrates']);
            for (let x = 0; x < algo_list.length; x++) {
              algo_html =
                algo_html === 'N/A'
                  ? `${beautify_algos(algo_list[x])}`
                  : `${algo_html}<br>${beautify_algos(algo_list[x])}`;
              algo_speed =
                (algo_speed !== 'N/A' ? `${algo_speed}<br>` : '') +
                `${beautify_mining_speed(ms[`gpu${i}`]['hashrates'][algo_list[x]])}`;
            }
            gpu_power = Object.keys(ms[`gpu${i}`]).includes('power')
              ? `${ms[`gpu${i}`]['power']} W`
              : `N/A`;
            gpu_temperature = Object.keys(ms[`gpu${i}`]).includes('temperature')
              ? `${ms[`gpu${i}`]['temperature']} °C`
              : `N/A`;
          } catch (e) {
          }
        }
        if (gpu_table === '')
          gpu_table += `<div class="flexbreak"></div>
<div class="mining-gpu-table">
<div class="mining-gpu-line">
    <div class="mining-line-algos" style="justify-content: center;">
        <span>Mining Algoritm</span>
    </div>
    <div class="mining-line-speed" style="justify-content: center;">
        <span>Mining Speed</span>
    </div>
    <div class="mining-line-power" style="justify-content: center;">
        <span>Power</span>
    </div>
    <div class="mining-line-temp" style="justify-content: center;">
        <span>Temperature</span>
    </div>
</div><div class="flexbreak"></div>`;
        gpu_table += `<div class="mining-gpu-line">
    <div class="oc-gpu-left">
        <div class="oc-gpu-left-info" style="height:auto;">
            <span style="font-weight:500;">GPU ${i}</span>
        </div>
    </div>
    <div class="mining-line-algos" style="justify-content: center;">
        <span style="text-align:center;">${algo_html}</span>
    </div>
    <div class="mining-line-speed" style="justify-content: center;">
        <span style="text-align:center;">${algo_speed}</span>
    </div>
    <div class="mining-line-power" style="justify-content: center;">
        <span style="text-align:center;">${gpu_power}</span>
    </div>
    <div class="mining-line-temp" style="justify-content: center;">
        <span style="text-align:center;">${gpu_temperature}</span>
    </div>
</div><div class="flexbreak"></div>`;
      }
      if (gpu_table) gpu_table += `</div>`;
    }
  } catch (e) {
  }
  if (has_mining_image) {
    let c_earning_rate = 0;
    $('.clore-mining-content').html(`<!--<div class="clore-mining-line">
    <span>Current earning rate: <b>${c_earning_rate.toFixed(4)} $CLORE / day</b></span>
</div>-->
<div class="clore-mining-line">
    <span>Earned in last 24 hours: <b>${(server_info['mining_profit'] ? server_info['mining_profit'] : 0).toFixed(4)} $CLORE</b> <span class="tooltipx13"><i class="fa-solid fa-circle-info"></i><span class="tooltiptext13 tt213">Earning from mining in past 24 hours, you only mine when your machine is not rented</span></span>
    </span>
</div>
<div class="clore-mining-line">
    <span>To payout <b>${(server_info['mining_pending'] ? parseFloat(server_info['mining_pending']) : 0).toFixed(4)} / 5.000 $CLORE</b></span>
</div>${
      !server_info['mb']
        ? `<div class="mining-benchmark">
    <span>${server_info['rental_status'] === 0 ? `<i class="fa-solid fa-chart-line"></i> Your machine is currently benchmarking` : `Your machine will be benchmarked when not rented`}</span>
</div>`
        : gpu_table
    }`);
    $('.clore-mining-overview').css('display', 'flex');
  } else {
    $('.clore-mining-overview').css('display', 'none');
  }
}

async function refetch_my_servers() {
  await call_api('myservers').then((api_res) => glob_ms = api_res.servers).catch(function (err) {
  });
}

var mass_onboarding_auth='', gpu_poh_capacities={}, ms_page_acc_all_poh = 0
const ixx = setInterval(async function () {
  try {
    if ($ && getCookie && QRCode && call_api && document.getElementById('mt-MyServers')) {
      // jquery loaded
      clearInterval(ixx);
      if (getCookie('clore_token')) {
        let cerr = '';

        const myservers_promise = call_api("myservers").catch(function (err) { cerr = err })
        const pow_info_promise = call_api("get_pow_info").catch(function (err) { cerr = err })
        const coin_prices_promise =  call_api("coins/usd/prices").catch(function (err) {cerr = err;})

        const [myservers, pow_info, coin_prices] = await Promise.all([myservers_promise, pow_info_promise, coin_prices_promise])

        if (!cerr) {
          mass_onboarding_auth=myservers["mass_onboarding_auth"]
          if(typeof(pow_info?.ticker_to_name)==='object') pow_ticker_to_name = pow_info?.ticker_to_name
          ms_default_html = document.getElementById('mt-MyServers').innerHTML;
          glob_ms = myservers['servers'];
          slimit = myservers['limit'];
          gpu_poh_capacities = myservers?.poh_gpu_capacities
          ms_page_acc_all_poh = myservers?.poh_amount || 0
          coins_in_usd = coin_prices['coin_prices_in_usd']

          //console.log(myservers)
          if (myservers['fiat']) {
            //  glob_hoster_fiat_enabled=true;
          } else {
            /*let iint = setInterval(function(){
                                    //console.log("ffiii")
                                    try{
                                        if($(".server-fiat-info").css("display")=="flex"){
                                            clearInterval(iint)
                                        }else{
                                            $(".server-fiat-info").css("display","flex");
                                        }
                                    }catch(e){}
                                },10)*/
          }
          $('#mt-myserver-count').text(`${glob_ms.length}/${myservers['limit']}`);
          $('#mt-myserver-count-head').text(`${glob_ms.length}/${myservers['limit']}`);
          mk_top_select(
            location.hash === '#myservers'
              ? `mt-ms`
              : location.hash === '#myorders'
                ? `mt-mo`
                : location.hash.includes('#chat')
                  ? `mt-ch`
                  : location.hash === '#proof-of-holding'
                    ? `mt-poh`
                    : `mt-mt`
          );
          //render_my_servers()
        }
        oeno_checker();
        try {
          let template_name_e = document.getElementById('template-name');
          template_name_e.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
              event.preventDefault();
              confirm_create_template();
            }
          });
        } catch (e) {
        }
      } else {
        mk_top_select(
          location.hash === '#myservers'
            ? `mt-ms`
            : location.hash === '#myorders'
              ? `mt-mo`
              : location.hash.includes('#chat')
                ? `mt-ch`
                : location.hash === '#proof-of-holding'
                  ? `mt-poh`
                  : `mt-mt`
        );
        oeno_checker();
      }
    }
  } catch (e) {
    console.error(e);
  }
}, 10);

let ff_oeno = false;
let lsid = 0;

function render_secure_pricing(package_id) {
  try {
    $('.secure-gpu-price').html(`${secure_cloud_packages[package_id]['PRICE'].toFixed(4)} $/hr`);
    $('.secure-disk-price').html(
      `${((secure_cloud_packages['disk_price_gb_per_day'] / 24) * parseInt($(`#secure-disk-gb`).val())).toFixed(4)} $/hr`,
    );
  } catch (e) {
    console.error(e);
  }
}

function resizeInput(id, n) {
  if (id === 'secure-disk-val') {
    let n = parseInt($(`#${id}`).val());
    if (isNaN(n)) {
      $(`#${id}`).val(80);
    } else if (n < 10) {
      $(`#${id}`).val(10);
    } else if (n > 512) {
      $(`#${id}`).val(512);
    }
  }
  if (!n) $('#secure-disk-gb').val(parseInt($(`#${id}`).val()));
  render_secure_pricing(lsid);
  $(`#${id}`).attr('style', 'width:' + ($(`#${id}`).val().length * 10 + 2) + 'px!important;');
}

function render_secure_cloud_package(id) {
  render_secure_pricing(id);
  lsid = id;
  let p = secure_cloud_packages[id];
  document.getElementById('sn-secure-cpu').innerText = p.CPU;
  document.getElementById('sn-secure-ram').innerText = p.RAM;
}

function ch_secure_disk() {
  let gb = parseInt($('#secure-disk-gb').val());
  $(`#secure-disk-val`).val(gb);
  resizeInput('secure-disk-val', true);
}

function oeno_checker() {
  $(window).click(function () {
    //Hide the menus if visible });
    $('.no-abs-parent').click(function (event) {
      event.stopPropagation();
    });
    $('.no-images').click(function (event) {
      event.stopPropagation();
    });
    if (document.getElementById('no-configure').style.display !== 'none') {
      if ($('.no-img-open-stat').html().includes('up')) {
        if (ff_oeno) {
          close_no_img_sel();
        } else {
          ff_oeno = true;
        }
      }
    }
  });
}

function use_cloud(type, fr) {
  if (document.getElementById('remember-cloud').checked || fr)
    setCookie('cloud-selection', type, 365 * 3);
  if (type === 'community') {
    $('.ccs-parent').css('display', 'none');
    document.body.classList.add(`body-mt`);
    $('#mt-Marketplace').css('display', 'flex');
  } else {
    document.body.classList.remove(`body-mt`);
    show_no(default_images, 'secure', '');
  }
}

function chk_secure_force() {
  if (location.search.includes('?secure')) location.search = '';
}

function mk_top_select(obj) {
  $('.rental-s-chart').html('');
  $('#bg-monaco').html('');
  $('.mt-ms-user-servers-init__video').html('');

  const oldSelectedItem = document.querySelectorAll('.mt-selected')

  for (let x = 0; x < oldSelectedItem.length; x++) {
    oldSelectedItem[x].classList.remove('mt-selected')
  }

  const sidebarItem = document.querySelector(`[data-sidebar-link=${obj}]`);

  if (sidebarItem) {
    sidebarItem.classList.add('mt-selected')
  }

  let all = ['mt-mt', 'mt-ms', 'mt-mo', 'mt-ch', 'mt-poh'];
  for (let z = 0; z < all.length; z++) {
    let c = all[z];
    if (c === obj) {
      if (!document.getElementById(obj).classList.contains('mt-selected'))
        add_class_to_object(c, 'mt-selected');
    } else {
      try {
        rm_class_from_object(c, 'mt-selected');
      } catch (e) {
      }
    }
  }

  if (obj === 'mt-ms') {
    location.hash = '#myservers';
    document.getElementById('mt-MyServers').innerHTML = ms_default_html;
    //if(!glob_hoster_fiat_enabled) $(".server-fiat-info").css("display","flex");
    $('#mt-myserver-count').text(`${glob_ms.length}/${slimit}`);
    $('#mt-myserver-count-head').text(`${glob_ms.length}/${slimit}`);
    render_poh_gpu_capacities(gpu_poh_capacities)
    if (!getCookie('clore_token')) location.replace('/login');
    render_my_servers();
    $('#mt-MyServers').css('display', 'flex');
    document.body.classList.add(`body-mt`);
    const mass_price_button = $('.mass-price-button');
    // remove cookie condition if ready to public release
    (mass_price_change_enabled) ? mass_price_button?.css('display', 'block') : mass_price_button?.remove();
    calculate_and_render_poh_capacity()
  } else {
    $('#mt-MyServers').css('display', 'none');
  }

  if (obj === 'mt-mt') {
    location.hash = '';
    let force_secure = false; //location.search.includes("?secure")
    call_marketplace_servers(false, true);
    get_templates();
    let default_cloud = getCookie('cloud-selection');
    if (!default_cloud && !force_secure) {
      $('.ccs-parent').css('display', 'flex');
      $('#mt-Marketplace').css('display', 'none');
      document.body.classList.remove(`body-mt`);
    } else if (default_cloud === 'community' && !force_secure) {
      $('#mt-Marketplace').css('display', 'flex');
      document.body.classList.add(`body-mt`);
      $('.ccs-parent').css('display', 'none');
    } else {
      $('.ccs-parent').css('display', 'none');
    }
  } else {
    $('#mt-Marketplace').css('display', 'none');
    $('.ccs-parent').css('display', 'none');
    // document.body.classList.remove(`body-mt`);
  }

  if (obj === 'mt-mo') {
    $('#mt-MyOrders').css('display', 'flex');
    location.hash = '#myorders';
    show_orders();
    document.body.classList.add(`body-mt`);
  } else {
    $('#mt-MyOrders').css('display', 'none');
  }

  if (obj === 'mt-poh') {
    location.hash = '#proof-of-holding';
    render_PoH()
    $('#mt-proof-of-holding').css('display', 'flex');
    document.body.classList.add(`body-mt`);
  } else {
    $('#mt-proof-of-holding').css('display', 'none');
  }

  if (obj === 'mt-ch') {
    $('#mt-chat').css('display', 'flex');
    document.body.classList.add(`body-mt`);
    location.hash = '#chat';
    pull_chats();
    //render_chat("#chat-obj", cc_chat);
  } else {
    $('#mt-chat').css('display', 'none');
  }

  if (obj === 'mt-co') {
    $('#mt-create-order').css('display', 'flex');
  } else {
    $('#mt-create-order').css('display', 'none');
  }

  opened_chat = 0;
  $('.chat-list').css('display', 'flex');
  $('.chat-opened').css('display', 'none');
}

function getRemainingServerTimeString(endTime) {
  const currentTime = new Date().getTime();
  const total = endTime - currentTime;

  if (total <= 0) return null;

  const totalHours = Math.floor(total / (1000 * 60 * 60));
  const minutes = Math.floor((total / (1000 * 60)) % 60);

  if (totalHours === 0 && minutes === 0) return null; // don't count seconds

  return `${totalHours}h ${minutes}m`;
}

let serverTimerInterval;
function serverRemaingTimer(remainingTime = 0) {
  if (serverTimerInterval) {
    clearInterval(serverTimerInterval);
  }

  serverTimerInterval = setInterval(() => {
    render_remaining_time(remainingTime);

    for (let i = 0; i < glob_ms.length; i++) {
      let cserser = glob_ms[i];
      if (cserser.rented) {
        const element = document.getElementById(`timer-remaining-${i}`);
        const remTimeString = getRemainingServerTimeString(cserser.remaining_time);

        if (remTimeString) {
          element.innerText = `${remTimeString} to completion`;
        } else {
          element.innerText = "Completed";

        //
        const statusRented = document.getElementById(`server-${i}`).querySelector('.mt-ms-content__list__server__status-text');
          if (statusRented) {
            statusRented.innerText = 'Not rented';
            statusRented.classList.remove('mt-ms-content__list__server__status-text_active');
            statusRented.classList.add('mt-ms-content__list__server__status-text_inactive');
          }
        }
      }
    }
  }, 50000);
}

function render_my_servers() {
  if (glob_ms.length === 0) {
    // user don't have any servers
    $('#user-servers-box').html(`<span class="aero-b1">You don't have any server connected yet</span>`);
    $('.mt-ms-content__box').addClass('mt-ms-content__box_empty');
  } else {
    $('.mt-ms-content__box').removeClass('mt-ms-content__box_empty');

    function getServerStatusText(cserser) {
      if (cserser?.removing) {
        return { class: 'mt-ms-content__list__server__status-text_in_removal', status: 'In removal' };
      }
      if (cserser?.rented) {
        return getRemainingServerTimeString(cserser.remaining_time)
          ? { class: 'mt-ms-content__list__server__status-text_active', status: 'Rented' }
          : { class: 'mt-ms-content__list__server__status-text_inactive', status: 'Not rented' };
      }

      return { class: 'mt-ms-content__list__server__status-text_inactive', status: 'Not rented' };
    }

    let tmphtml = '';
    for (let i = 0; i < glob_ms.length; i++) {
      let cserser = glob_ms[i];
      const serverId = `server-${i}`;
      const serverStatus = getServerStatusText(cserser)
      const gpu = cserser?.specs?.gpu ? cserser.specs.gpu.replace(/NVIDIA\s*|GeForce\s*/g, '') : 'N/A';
      tmphtml +=
        `
          <div id="${serverId}" class="mt-ms-content__list__server" ${cserser?.removing ? 'style="cursor: not-allowed;"' : `onclick="open_server('${cserser?.name ?? ''}')"`}>
            <div class="mt-ms-content__list__server__row flex row flex-start">
              <div class="mt-ms-content__list__server__main">
              <span class="mt-ms-content__list__server__status-text ${serverStatus.class} aero-caption">
                  ${serverStatus.status}
              </span>
                <div class="mt-ms-content__list__server__name-box">
                  <div class="mt-ms-content__list__server__name aero-b2">
                    <svg class="mt-ms-content__list__server__icon" xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
                      <circle cx="4" cy="4.5" r="4" fill="${cserser?.online ? 'var(--aero-green)' : 'var(--aero-red)'}" />
                    </svg>
                    <span data-line-clamp>${cserser?.name ?? 'Unknown'}</span>
                  </div>
                  ${cserser.rented ? (
                    `<div class="mt-ms-content__list__server__time">
                      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5.16667V8.5L10 10.5M2 8.5C2 9.28793 2.15519 10.0681 2.45672 10.7961C2.75825 11.5241 3.20021 12.1855 3.75736 12.7426C4.31451 13.2998 4.97595 13.7417 5.7039 14.0433C6.43185 14.3448 7.21207 14.5 8 14.5C8.78793 14.5 9.56815 14.3448 10.2961 14.0433C11.0241 13.7417 11.6855 13.2998 12.2426 12.7426C12.7998 12.1855 13.2417 11.5241 13.5433 10.7961C13.8448 10.0681 14 9.28793 14 8.5C14 6.9087 13.3679 5.38258 12.2426 4.25736C11.1174 3.13214 9.5913 2.5 8 2.5C6.4087 2.5 4.88258 3.13214 3.75736 4.25736C2.63214 5.38258 2 6.9087 2 8.5Z" 
                          stroke="${cserser?.rented ? 'var(--aero-green)' : 'var(--aero-white60)'}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <div class="mt-ms-content__list__server__timer mt-ms-content__list__server__timer_active" data-line-clamp>
                        <span id="timer-remaining-${i}">
                          ${getRemainingServerTimeString(cserser.remaining_time)
                          ? `${getRemainingServerTimeString(cserser.remaining_time)} to completion`
                          : 'Completed'}
                        </span>
                      </div>
                    </div>`
                  ) : ''}
                </div>
              </div>

              ${cserser?.removing ? '' : `
                <ul class="mt-ms-content__list__server__params mt-ms-server-params">
                  <li class="mt-ms-server-params__item">
                    <p class="mt-ms-server-params__name">GPU</p>
                    <p class="mt-ms-server-params__value" data-line-clamp>${gpu}</p>
                  </li>
                  <li class="mt-ms-server-params__item">
                    <p class="mt-ms-server-params__name">CPU</p>
                    <p class="mt-ms-server-params__value" data-line-clamp >${cserser?.specs?.cpus ?? 'N/A'}</p>
                  </li>
                </ul>
              `}
            </div>

            <svg class="mt-ms-content__list__server__icon mt-ms-content__list__server__icon-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
              <path d="M9.5 6.5L15.5 12.5L9.5 18.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        `;
    }

    $('#user-servers-box').html(tmphtml).css('justify-content', 'flex-start');

    serverRemaingTimer();
  }
}

function add_server() {
  const input = document.getElementById('new-server-name');
  const modalAddServer = new AeroModal("add-server-aero");

  input?.classList.remove('error');
  $('#mt-ms-modal-input-error').text('');
  $('#new-server-name').val('');

  modalAddServer.openModal();
}

let los = '';
let lgs = 0;
let bg_job_max = 0;
let default_edit_selected = false;
let last_stock_oc_override = {};

setInterval(async function () {
  let cname = document.getElementById('si-cn').innerText;
  if (document.getElementById('rs-aselect') && cname && lgs < unix_timestamp() - 15) {
    lgs = unix_timestamp();
    try {
      let cerr = '';
      let apires = await call_api('get_my_server', { name: cname }).catch(function (err) {
        cerr = err;
      });
      if (apires['bg_job_max']) bg_job_max = apires['bg_job_max'];
      if (apires['info']['initialized'] && cname === document.getElementById('si-cn').innerText) {
        if (apires['info']) render_clore_mining(apires['info']);
        render_cs_status(apires['info']['online']);
        render_rt_status(apires['info']['rental_status']);
        render_ss_status(apires['info']['monitoring'], apires['info']['online']);
        render_last_pow_stats(apires?.info?.last_pow_stats)
        if (
          apires['info']['allow_oc'] &&
          apires['info']['oc_gpus'] &&
          $('.oc-in-content').html().includes(`class="oc-disabled"`)
        ) {
          render_server_oc(
            apires['info']['oc_gpus'],
            apires['info']['oc_profiles'] ? apires['info']['oc_profiles'] : [],
            apires['info']['allowed_coins'].includes('bitcoin'),
            apires['info']['allowed_coins'].includes('usd'),
            apires['info']['allowed_coins'].includes('CLORE-Blockchain'),
          );
        }

        if (apires['info']['stock_oc_override']) {
          last_stock_oc_override = apires['info']['stock_oc_override']
            ? apires['info']['stock_oc_override']
            : {};
        } else {
          last_stock_oc_override = {};
        }
      } else {
        last_stock_oc_override = {};
      }
      if (
        apires['info']['initialized'] &&
        apires['grafana'] &&
        !(apires['grafana'] === 'server-error' || apires['grafana'] === 'no-graph') &&
        !$('.rental-s-chart').html().includes('iframe')
      ) {
        $('.rental-s-chart').html(`<div class="grafana-timeframes noselect">
                <div class="grafana-time-btn" data-server-period="6h" onclick="set_grafana('6h')">
                    <span>6h</span>
                </div>
                <div class="grafana-time-btn active-btn" data-server-period="24h" onclick="set_grafana('24h')">
                    <span>24h</span>
                </div>
                <div class="grafana-time-btn" data-server-period="7d" onclick="set_grafana('7d')">
                    <span>7d</span>
                </div>
                <div class="grafana-time-btn" data-server-period="14d" onclick="set_grafana('14d')">
                    <span>14d</span>
                </div>
            </div><div class="flexbreak"></div><iframe id="grafana-f" src="${apires['grafana']}&from=now-24h&to=now" style="width: 100%;"></iframe>`);
      }
    } catch (e) {
    }
  }
}, 1000);

let s_oc_profiles = [];
let s_oc_gpu_bpu_json = {};

function render_server_oc(
  gpu_str,
  oc_profiles,
  btc_enabled,
  usd_enabled,
  clore_enabled,
  render_oc_profile,
) {
  try {
    if (!oc_profiles) oc_profiles = [];
    s_oc_profiles = oc_profiles;
    let gpu_json = JSON.parse(gpu_str),
      s_oc_profiles_html = '',
      s_bg_profiles_html = '';
    s_oc_profiles_html += `<div class="no-abs">
    <div class="no-img-entry" id="no-f-img-c" onclick="select_s_oc_profile(${-2}); close_oc_sel();">
        <span>Stock</span>
    </div>
</div>`;
    s_bg_profiles_html += `<div class="no-abs">
    <div class="no-img-entry" onclick="select_bg_oc_profile(${-2})">
        <span>Stock</span>
    </div>
</div>`;
    for (let i = 0; i < s_oc_profiles.length; i++) {
      s_oc_profiles_html += `<div class="no-abs">
    <div class="no-img-entry" id="no-f-img-c" onclick="select_s_oc_profile(${i}); close_oc_sel();">
        <span>Profile #${s_oc_profiles[i]['id']}</span>
    </div>
</div>`;
      s_bg_profiles_html += `<div class="no-abs">
    <div class="no-img-entry" id="no-f-img-c" onclick="select_bg_oc_profile(${s_oc_profiles[i]['id']})">
        <span>Profile #${s_oc_profiles[i]['id']}</span>
    </div>
</div>`;
    }
    s_oc_profiles_html += `<div class="no-abs">
    <div class="no-img-entry" onclick="select_s_oc_profile(${-1}); close_oc_sel();">
        <span>New profile</span>
    </div>
</div>`;
    $('.s-oc-abs-parent').html(s_oc_profiles_html);
    $('.s-oc-abs-bg').html(s_bg_profiles_html);
    //console.log(gpu_json)
    s_oc_gpu_bpu_json = gpu_json;
    //$(".oc-s-usd-cost").css("display",usd_enabled?"flex":"none");
    $('.oc-s-btc-cost').css('display', btc_enabled ? 'flex' : 'none');
    $('.oc-s-CLORE-Blockchain-cost').css('display', clore_enabled ? 'flex' : 'none');
    let roc_str = '';
    try {
      roc_str = render_oc_profile.toString();
    } catch (e) {
    }
    select_s_oc_profile(render_oc_profile || roc_str === '0' ? render_oc_profile : -2);
  } catch (e) {
    console.error(e);
    aero_modal_alert('market-alert', {text: 'ERROR rendering OC info'})
  }
}

let last_s_oc_p_sel = 0;
let bg_job_oc_profile = -2;

function select_bg_oc_profile(img_id) {
  //TODO
  if ($('.s-oc-open-bg').html().includes('fa-caret-up')) toggle_oc_profile_bg();

  $('#s-oc-profile-bg').html(img_id === -2 ? `Stock` : `Profile #${img_id}`);

  bg_job_oc_profile = img_id;

  close_oc_bg();
}

function select_s_oc_profile(n) {
  // todo: set OC profile
  if ($('.s-oc-open-stat').html().includes('fa-caret-up')) toggle_oc_profile_sel();
  last_s_oc_p_sel = n;
  if (n === -2) {
    $('#s-oc-profile').html('Stock');
    render_oc_info_table(
      `.oc-gpu-table`,
      's',
      s_oc_gpu_bpu_json,
      /*{}*/ last_stock_oc_override,
      true,
      false,
      true,
    );
  } else if (n === -1) {
    $('#s-oc-profile').html('New profile');
    render_oc_info_table(`.oc-gpu-table`, 's', s_oc_gpu_bpu_json, {}, false);
  } else {
    $('#s-oc-profile').html(`Profile #${s_oc_profiles[last_s_oc_p_sel]['id']}`);
    let c_oc_profile = s_oc_profiles[n];
    render_oc_info_table(`.oc-gpu-table`, 's', s_oc_gpu_bpu_json, c_oc_profile, false);
  }
  if (n === -2) {
    let is_default = validate_default_changes();
    if (Object.keys(last_stock_oc_override).length !== 0) is_default = true;
    $('.clock-stock-modification-box').css('display', is_default ? 'flex' : 'none');
    $('.reset-stock-oc-parent').css('display', is_default ? 'flex' : 'none');
  } else {
    $('.clock-stock-modification-box').css('display', 'none');
    $('.reset-stock-oc-parent').css('display', 'none');
  }
}

let c_oc_settings_err = {};

function validate_default_changes() {
  let desired_configured_state = get_oc_profile_from_ui('s');
  let not_default = false;
  let desired_configured_state_keys = Object.keys(desired_configured_state);
  if (typeof s_oc_gpu_bpu_json != 'object' || !s_oc_gpu_bpu_json.length) return;
  desired_configured_state_keys.forEach((key) => {
    if (not_default) return not_default;
    let c_gpu = s_oc_gpu_bpu_json[key];
    let desired_state = desired_configured_state[key];
    if (desired_state) {
      if (desired_state['core'] && desired_state['core'] !== '0') not_default = true;
      if (desired_state['mem'] && desired_state['mem'] !== '0') not_default = true;
    }
    if (c_gpu && !not_default) {
      if (c_gpu['default_power_limit'] && desired_state['pl']) {
        if (parseInt(c_gpu['default_power_limit']) !== parseInt(desired_state['pl']))
          not_default = true;
      }
    }
  });
  return not_default;
}

function validate_oc_input(obj, unset_obj) {
  let input_obj = $(obj);
  let pv = parseInt(
    input_obj.val().toString().replace(/\./g, '').replace(/\,/g, '').replace(/\+/g, ''),
  );
  if(unset_obj){
    $(unset_obj).css("display", input_obj.val()==""?"flex":"none")
  }
  try {
    if (default_edit_selected) {
      let is_default = validate_default_changes();
      if (Object.keys(last_stock_oc_override).length !== 0) is_default = true;
      $('.clock-stock-modification-box').css('display', is_default ? 'flex' : 'none');
      $('.reset-stock-oc-parent').css('display', is_default ? 'flex' : 'none');
    } else {
      $('.clock-stock-modification-box').css('display', 'none');
      $('.reset-stock-oc-parent').css('none');
    }
  } catch (e) {
  }
  if (input_obj.val() !== '') {
    if (pv < input_obj.attr('min')) pv = input_obj.attr('min');
    if (pv > input_obj.attr('max')) pv = input_obj.attr('max');
    if (pv.toString() !== input_obj.val().toString() && input_obj.val() !== '-0') {
      //input_obj.val(pv);
      input_obj.addClass('oc-invalid-input');
      $('.oc-s-alert').css('display', 'flex');
      $('.oc-s-profile-save-btn').addClass('disable-oc-btn');
      const c_err_html = `<div class="ba-td">
    <span>GPU ${obj.split('-')[3]} ${obj.split('-')[2] === 'core' ? `Core lock` : obj.split('-')[2] === 'mem' ? `Mem lock` : obj.split('-')[2] === '1' ? `Core offset` : obj.split('-')[2] === '2' ? `Memory offset` : `Power limit`} can be in range of <b>${input_obj.attr('min')} ${obj.split('-')[2] !== '3' ? `MHz` : `W`}</b> - <b>${input_obj.attr('max')} ${obj.split('-')[2] !== '3' ? `MHz` : `W`}</b></span>
</div>`;
      $('.oc-s-alert').html(c_err_html);
      c_oc_settings_err[obj] = c_err_html;
    } else {
      if (c_oc_settings_err[obj]) delete c_oc_settings_err[obj];
      if (Object.keys(c_oc_settings_err).length > 0) {
        $('.oc-s-alert').html(c_oc_settings_err[Object.keys(c_oc_settings_err)[0]]);
      } else {
        $('.oc-s-alert').css('display', 'none');
        $('.oc-s-profile-save-btn').removeClass('disable-oc-btn');
      }
      input_obj.removeClass('oc-invalid-input');
    }
  } else {
  }
}

function get_oc_profile_from_ui(identifier) {
  let c_pos = 0;
  const res = {};
  while (
    document.getElementById(`oc-${identifier}-1-${c_pos}`) &&
    document.getElementById(`oc-${identifier}-2-${c_pos}`) &&
    document.getElementById(`oc-${identifier}-3-${c_pos}`)
    ) {
    res[c_pos.toString()] = {
      core: document.getElementById(`oc-${identifier}-1-${c_pos}`).value,
      mem: document.getElementById(`oc-${identifier}-2-${c_pos}`).value,
      pl: document.getElementById(`oc-${identifier}-3-${c_pos}`).value,
    };
    let core_lock = document.getElementById(`oc-${identifier}-core-${c_pos}`).value,
        mem_lock = document.getElementById(`oc-${identifier}-mem-${c_pos}`).value
    if(core_lock) res[c_pos.toString()]["core_lock"]=core_lock
    if(mem_lock) res[c_pos.toString()]["mem_lock"]=mem_lock
    if (!res[c_pos.toString()]['core']) res[c_pos.toString()]['core'] = '0';
    if (!res[c_pos.toString()]['mem']) res[c_pos.toString()]['mem'] = '0';
    if (!res[c_pos.toString()]['pl']) res[c_pos.toString()]['pl'] = '0';
    c_pos++;
  }
  return res;
}

let disabled_oc_save = false;
let disabled_oc_remove = false;

async function save_oc_profile(default_reset) {
  if(default_edit_selected && !default_oc_save_allowed){
    $(".oc-not-allowed-alert").css("display", "flex")
    return
  }
  if ($('.oc-s-profile-save-btn').attr('class').split(' ').includes('disable-oc-btn')) return;

  if (disabled_oc_save) return;

  disabled_oc_save = true;

  $('.oc-s-profile-save-btn').html(`<i class="fa-solid fa-cog fa-spin"></i>`);

  if ($('.oc-s-alert').css('display') === 'flex') return;

  $('.oc-change-submit-err').html('');

  const c_oc_profile = get_oc_profile_from_ui('s');
  const create_profile = last_s_oc_p_sel === -1;
  const oc_btc_cost = $('#oc-s-btc-cost').val();
  const oc_usd_cost = $('#oc-s-usd-cost').val();

  c_oc_profile['btc'] = oc_btc_cost;
  c_oc_profile['usd'] = oc_usd_cost;
  c_oc_profile['CLORE-Blockchain'] = $('#oc-s-CLORE-Blockchain-cost').val();

  if (create_profile) {
    // create OC profile
    let cerr = '';
    let apires = await call_api('add_oc_profile', {
      server_id: current_open_server_id,
      profile: c_oc_profile,
    }).catch(function (err) {
      cerr = err;
    });

    disabled_oc_save = false;

    $('.oc-s-profile-save-btn').html(`<span>Create Profile</span>`);

    if (cerr) {
      beautiful_alert('.oc-change-submit-err', 'Connection error', '', -10);
    } else if (apires['error'] === 'invalid_input') {
      beautiful_alert('.oc-change-submit-err', 'Invalid input values', '', -10);
    } else if (apires['error'] === 'maximum_10_profiles') {
      beautiful_alert(
        '.oc-change-submit-err',
        'Maximum number of custom OC profiles is 10',
        '',
        -10,
      );
    } else if (apires['error']) {
      beautiful_alert('.oc-change-submit-err', 'Database error', '', -10);
    } else {
      await reload_oc_profiles();
    }
  } else if (default_edit_selected) {
    let cerr = '';

    delete c_oc_profile['btc'];
    delete c_oc_profile['usd'];
    delete c_oc_profile['CLORE-Blockchain'];

    await call_api('add_oc_profile', {
      server_id: current_open_server_id,
      profile: default_reset ? {} : c_oc_profile,
      edit_stock: true,
    }).catch(function (err) {
      cerr = err;
    });

    disabled_oc_save = false;

    $('.oc-s-profile-save-btn').html(`<span>Apply Changes</span>`);

    await reload_oc_profiles();
  } else {
    // update existing OC profile
    let profile_id = s_oc_profiles[last_s_oc_p_sel]['id'];
    //console.log("profile id",profile_id)
    let cerr = '';
    let apires = await call_api('add_oc_profile', {
      server_id: current_open_server_id,
      profile: c_oc_profile,
      profile_id,
    }).catch(function (err) {
      cerr = err;
    });

    disabled_oc_save = false;

    $('.oc-s-profile-save-btn').html(`<span>Apply Changes</span>`);

    if (cerr) {
      beautiful_alert('.oc-change-submit-err', 'Connection error', '', -10);
    } else if (apires['error'] === 'invalid_input') {
      beautiful_alert('.oc-change-submit-err', 'Invalid input values', '', -10);
    } else if (apires['error'] === 'maximum_10_profiles') {
      beautiful_alert(
        '.oc-change-submit-err',
        'Maximum number of custom OC profiles is 10',
        '',
        -10,
      );
    } else if (apires['error']) {
      beautiful_alert('.oc-change-submit-err', 'Database error', '', -10);
    } else {
      await reload_oc_profiles();
    }
  }
  //console.log(c_oc_profile)
}

async function remove_oc_profile() {
  if ($('.oc-s-profile-rm-btn').attr('class').split(' ').includes('aero-btn-primary-disabled')) return;
  if (disabled_oc_remove) return;
  disabled_oc_remove = true;
  let to_remove_oc_profile = s_oc_profiles[last_s_oc_p_sel],
    cerr = '';
  $('.oc-change-submit-err').html('');
  let apires = await call_api('rm_oc_profile', {
    server_id: current_open_server_id,
    profile: to_remove_oc_profile,
  }).catch(function (err) {
    cerr = err;
  });
  disabled_oc_remove = false;
  if (cerr) {
    beautiful_alert('.oc-change-submit-err', 'Connection error', '', -10);
  } else if (apires['error'] === 'failure') {
    beautiful_alert('.oc-change-submit-err', 'Processing error', '', -10);
  } else if (apires['error']) {
    beautiful_alert('.oc-change-submit-err', 'Database error', '', -10);
  } else {
  }
  // console.log(to_remove_oc_profile);
  //last_s_oc_p_sel;
  await reload_oc_profiles(true);
}

let hive_flightsheet_selected = false;
let should_show_oc_in_background_job = false;

async function reload_oc_profiles(remove) {
  let cerr = '';

  // $('.oc-s-working-parent').css('display', 'flex');

  let apires = await call_api('get_my_server', {
    name: document.getElementById('si-cn').innerText,
  }).catch(function (err) {
    cerr = err;
  });

  if (cerr) {
    location.reload();
  } else if (apires['info']['initialized']) {
    if (apires['info']) render_clore_mining(apires['info']);

    $('.oc-s-working-parent').css('display', 'none');

    if (apires['info']['allow_oc'] && apires['info']['oc_gpus']) {
      if (hive_flightsheet_selected) {
        $('.bg-show-oc').css('display', 'none');
      } else if (apires['info']['oc']) {
        $('.bg-show-oc').css('display', 'flex');
        should_show_oc_in_background_job = true;
        select_bg_oc_profile(apires['info']['oc']);
      } else {
        $('.bg-show-oc').css('display', 'flex');
        should_show_oc_in_background_job = true;
        select_bg_oc_profile(-2);
      }
      last_stock_oc_override = apires['info']['stock_oc_override']
        ? apires['info']['stock_oc_override']
        : {};
      render_server_oc(
        apires['info']['oc_gpus'],
        apires['info']['oc_profiles'] ? apires['info']['oc_profiles'] : [],
        apires['info']['allowed_coins'].includes('bitcoin'),
        apires['info']['allowed_coins'].includes('usd'),
        apires['info']['allowed_coins'].includes('CLORE-Blockchain'),
        remove ? -2 : last_s_oc_p_sel,
      );
    } else {
      location.reload();
    }
  } else {
    location.reload();
  }
}

function render_oc_info_table(
  table_obj,
  id,
  gpus,
  oc_profile,
  readonly,
  marketplace,
  default_edit,
) {
  $('.oc-s-alert').css('display', 'none');
  c_oc_settings_err = {};
  let gpu_line_html = '',
    to_display_obj = [],
    btc_profile_cost = 0,
    usd_profile_cost = 0,
    btc_profile_cost_obj = document.getElementById('oc-s-btc-cost'),
    usd_profile_cost_obj = document.getElementById('oc-s-usd-cost'),
    clore_profile_cost = 0,
    clore_profile_cost_obj = document.getElementById('oc-s-CLORE-Blockchain-cost'),
    hide_lock_oc = g_c_machine_backend_version < 17 && location.hash.includes("myservers")
  try {
    if (oc_profile['usd']) usd_profile_cost = oc_profile['usd'];
  } catch (e) {
  }
  try {
    if (oc_profile['CLORE-Blockchain']) clore_profile_cost = oc_profile['CLORE-Blockchain'];
  } catch (e) {
  }
  try {
    if (oc_profile['btc']) btc_profile_cost = oc_profile['btc'];
  } catch (e) {
  }
  let oc_pr_str = '';
  try {
    oc_pr_str = JSON.stringify(oc_profile);
  } catch (e) {
  }
  default_edit_selected = !!default_edit;
  if (default_edit) {
    $('.oc-s-profile-save-btn').html(`<span>Apply changes</span>`);
    $('.oc-s-profile-save-btn').removeClass('aero-btn-primary-disabled');
    $('.oc-s-profile-rm-btn').addClass('aero-btn-primary-disabled');
  } else if (oc_pr_str === '{}' && readonly) {
    $('.oc-s-profile-rm-btn').addClass('aero-btn-primary-disabled');
    $('.oc-s-profile-save-btn').addClass('aero-btn-primary-disabled');
    $('.oc-s-profile-save-btn').html(`<span>Apply changes</span>`);
  } else if (oc_pr_str === '{}' && !readonly) {
    $('.oc-s-profile-save-btn').html(`<span>Create profile</span>`);
    $('.oc-s-profile-rm-btn').addClass('aero-btn-primary-disabled');
    $('.oc-s-profile-save-btn').removeClass('aero-btn-primary-disabled');
  } else {
    $('.oc-s-profile-save-btn').html(`<span>Apply changes</span>`);
    $('.oc-s-profile-save-btn').removeClass('aero-btn-primary-disabled');
    $('.oc-s-profile-rm-btn').removeClass('aero-btn-primary-disabled');
  }
  if (marketplace) {
    document.getElementById('oc-profile-mt-CLORE-Blockchain').value = clore_profile_cost;
    document.getElementById('oc-profile-mt-btc').value = btc_profile_cost;
    document.getElementById('oc-profile-mt-usd').value = usd_profile_cost;
  } else {
    usd_profile_cost_obj.value = usd_profile_cost;
    usd_profile_cost_obj.readOnly = !!readonly;
    btc_profile_cost_obj.value = btc_profile_cost;
    btc_profile_cost_obj.readOnly = !!readonly;
    clore_profile_cost_obj.value = clore_profile_cost;
    clore_profile_cost_obj.readOnly = !!readonly;
  }
  if (default_edit) readonly = false;
  $('.oc-s-working-child').css('height', `${262 + 41 * gpus.length}px`);
  for (let i = 0; i < gpus.length; i++) {
    let min_core_lock = 0,
        max_core_lock = 4200,
        min_mem_lock = 0,
        max_mem_lock = 18000
    let c_gpu = gpus[i],
      c_gpu_core = 0,
      c_gpu_mem = 0,
      c_gpu_pl = c_gpu['default_power_limit'],
      c_core_lock = '',
      c_mem_lock = ''
    if (oc_profile[i.toString()]) {
      c_gpu_core = oc_profile[i.toString()]['core'];
      c_gpu_mem = oc_profile[i.toString()]['mem'];
      c_gpu_pl = oc_profile[i.toString()]['pl'];
      c_core_lock = oc_profile[i.toString()]['core_lock'] || '',
      c_mem_lock = oc_profile[i.toString()]['mem_lock'] || ''
    }
    if(c_core_lock == '') to_display_obj.push(`.oc-${id}-core-lock-unset-${i}`)
    if(c_mem_lock == '') to_display_obj.push(`.oc-${id}-mem-lock-unset-${i}`)
    gpu_line_html += `<div class="oc-gpu-line">
    <div class="oc-gpu-left">
        <div class="oc-gpu-left-info">
            <span style="font-weight:500;">GPU ${i}</span>
        </div><div class="flexbreak"></div>
        <div class="oc-gpu-left-info">
            <span>${c_gpu['pci_core'].slice(-7).toUpperCase()}</span>
        </div>
    </div>
    <div class="oc-gpu-name">
        <span>${c_gpu['name']}</span>
    </div>
    <div class="core-lock oc-lb"${hide_lock_oc?' style="display:none"':''}>
      <div class="clock_lock_unset">
        <div class="clock_lock_unset_centering oc-${id}-core-lock-unset-${i}">
          <span>Unset</span>
        </div>
      </div>
      <input id="oc-${id}-core-${i}" min="${min_core_lock}" max="${max_core_lock}" value="${c_core_lock}" type="number" oninput="validate_oc_input('#oc-${id}-core-${i}', '.oc-${id}-core-lock-unset-${i}')"${readonly ? ` readonly` : ''}>
    </div>
    <div class="mem-lock oc-lb"${hide_lock_oc?' style="display:none"':''}>
      <div class="clock_lock_unset">
        <div class="clock_lock_unset_centering oc-${id}-mem-lock-unset-${i}">
          <span>Unset</span>
        </div>
      </div>
      <input id="oc-${id}-mem-${i}" min="${min_mem_lock}" max="${max_mem_lock}" value="${c_mem_lock}" type="number" oninput="validate_oc_input('#oc-${id}-mem-${i}', '.oc-${id}-mem-lock-unset-${i}')"${readonly ? ` readonly` : ''}>
    </div>
    <div class="core-offset oc-lb"${hide_lock_oc?' style="margin-left: auto;"':''}>
      <input id="oc-${id}-1-${i}" min="${c_gpu['core'][0] / 2}" max="${c_gpu['core'][1] / 2}" value="${c_gpu_core}" type="number" oninput="validate_oc_input('#oc-${id}-1-${i}')"${readonly ? ` readonly` : ''}>
    </div>
    <div class="mem-offset oc-lb">
      <input id="oc-${id}-2-${i}" min="${c_gpu['mem'][0] / 2}" max="${c_gpu['mem'][1] / 2}" value="${c_gpu_mem}" type="number" oninput="validate_oc_input('#oc-${id}-2-${i}')"${readonly ? ` readonly` : ''}>
    </div>
    <div class="power-limit oc-lb">
      <input id="oc-${id}-3-${i}" min="${c_gpu['power_limits'][0]}" max="${c_gpu['power_limits'][1]}" value="${c_gpu_pl}" type="number" oninput="validate_oc_input('#oc-${id}-3-${i}')"${readonly ? ` readonly` : ''}>
    </div>
</div>`;
  }
  let tbl_html = `<div class="oc-gpu-line">
    <div class="oc-gpu-left">
        <div class="reset-stock-oc-parent noselect">
            <div class="reset-stock-oc-btn aero-btn-primary" onclick="save_oc_profile(true)">
                <span class="aero-b3">Reset</span>
            </div>
        </div>
    </div>
    <div class="core-lock oc-top-names"${hide_lock_oc?' style="display:none"':''}>
        <span>Core lock (MHz)</span>
    </div>
    <div class="mem-lock oc-top-names"${hide_lock_oc?' style="display:none"':''}>
        <span>Mem lock (MHz)</span>
    </div>
    <div class="core-offset oc-top-names"${hide_lock_oc?' style="margin-left: auto;"':''}>
        <span>Core offset (MHz)</span>
    </div>
    <div class="mem-offset oc-top-names">
        <span>Mem offset (MHz)</span>
    </div>
    <div class="power-limit oc-top-names">
        <span>Power limit (W)</span>
    </div>
</div>${gpu_line_html}`;
  $(table_obj).html(tbl_html);
  to_display_obj.forEach(flex_obj => {
    $(flex_obj).css("display", "flex")
  })
}

let current_open_server_id = 0, is_usd_autoprice = false,
  g_c_machine_backend_version = -1;

function merge_checkboxes(source_id, destination_id) {
  document.getElementById(destination_id).checked = document.getElementById(source_id).checked;
}

function show_auto_pricing_enable_not_allowed(reason, show_price_change_buttons){
  modalRebootContainer = new AeroModal('auto-pricing-container-aero');

  if(show_price_change_buttons){
    $(".autopicing-modal-footer").css("display", "initial")
  }else{
    $(".autopicing-modal-footer").css("display", "none")
  }

  $(".auto-pricing-enable-failure-reason").html(reason)

  modalRebootContainer.openModal();
}

function parse_hashrate(hashrate){
  let hs = parseFloat(hashrate)
  if(hashrate === 'null') return 'Not measures yet'
  if(isNaN(hs) || hs<0) return 'Can\'t get data'
  if(hs < 1) return `${(hs*1000).toFixed(2)} H/s`
  if(hs < 1000) return `${(hs).toFixed(2)} KH/s`
  if(hs < 1000000) return `${(hs/1000).toFixed(2)} MH/s`
  return `${(hs/1000000).toFixed(2)} GH/s`
}

function render_last_pow_stats(input){
  let html = ''
  if(typeof(input)==='string' && input.includes('|')){
    let [coins_str, last_state] = input.split('|')
    let individual_coins = coins_str.split(';')
    individual_coins.forEach(coin_info => {
      if(coin_info.includes('=')){
        let ticker = coin_info.split('=')[0],
            hashrate = coin_info.split('=')[1]
        html+=`<div class="last-submited-hashrates-coin">
      <div class="lsh-hashrate-box">
        <span>Last Hashrate</span>
        <div class="flexbreak"></div>
        <span><b>${parse_hashrate(hashrate)}</b></span>
      </div>
      <div class="lsh-coin-name-box">
        <span>${pow_ticker_to_name[ticker] || "Unknown Coin"}</span>
        <div class="flexbreak"></div>
        <span><b>[${ticker}]</b></span>
      </div>
      <div class="lsh-coin-logo-box">
        <img src="/assets/${pow_ticker_to_name[ticker]? `coin_logos/${ticker}` : "img/unknown_coin"}.png">
      </div>
    </div>`
      }
    })
    if(last_state=="coin-not-supported"){
      $(".last-hashrates-alert").css("display", "flex")
      $(".last-hashrates-alert-txt span").html(`CLORE.AI Did not recognized all of your configured coins, so we are not able to estimate revenue per your background mining operation. Your machine has been set to <b>Unavailable for Rent</b>`)
    }else if(last_state=="cant_get_stats"){
      $(".last-hashrates-alert").css("display", "flex")
      $(".last-hashrates-alert-txt span").html(`CLORE.AI Could not get mining stats for all of your coins, so we are not able to estimate revenue per your background mining operation. Your machine has been set to <b>Unavailable for Rent</b>`)
    }else if(last_state=="missing-yeald"){
      $(".last-hashrates-alert").css("display", "flex")
      $(".last-hashrates-alert-txt span").html(`CLORE.AI Could not calculate revenue for your background mining job. Your machine has been set to <b>Unavailable for Rent</b>`)
    }else if(last_state=="miner_stopped_coins_updated"){
      $(".last-hashrates-alert").css("display", "flex")
      $(".last-hashrates-alert-txt span").html(`The configuration of coins in background job has been updated, but it isn't running yet. If your machine is rented, the background job will run after current rental ends. Your machine has been set to <b>Unavailable for Rent</b> until measured performance for current configuration.`)
    }else{ // got data properly
      $(".last-hashrates-alert").css("display", "none")
    }
  }
  if(html==''){
    $(".last-hashrates-alert").css("display", "flex")
    $(".last-hashrates-alert-txt span").html(`CLORE.AI Did not received hashrate data or mining configuation yet.<br>Note: this only works when using HiveOS flightsheet as background job`)
  }
  $(".last-submited-hashrates-box").html(html)
}

function render_auto_pow_pricing_multipliers(on_demand_multiplier, spot_multiplier){
  document.getElementById("apm-on-demand").value = on_demand_multiplier
  document.getElementById("apm-spot").value = spot_multiplier
}

function validate_autoprice_multipliers(){
  let on_demand_multiplier = parseFloat(document.getElementById("apm-on-demand").value),
      spot_multiplier = parseFloat(document.getElementById("apm-spot").value)
  if(isNaN(on_demand_multiplier) || on_demand_multiplier<1.2 || on_demand_multiplier > 50){
    $(".pow-autoprice-multipliers-alert").css("display", "flex")
    $(".pow-autoprice-multipliers-alert-txt span").html(`On demand multiplier is allowed in range <b>1.2 - 50</b>`)
    return []
  } else if (isNaN(spot_multiplier) || spot_multiplier < 1.05 || spot_multiplier > 50) {
    $(".pow-autoprice-multipliers-alert").css("display", "flex")
    $(".pow-autoprice-multipliers-alert-txt span").html(`On demand multiplier is allowed in range <b>1.05 - 50</b>`)
    return []
  } else{
    $(".pow-autoprice-multipliers-alert").css("display", "none")
    return [on_demand_multiplier, spot_multiplier]
  }
}

let apply_multipliers_running=false
async function multipliers_apply(only_enabled){
  if(!only_enabled){
    if(apply_multipliers_running) return;
    apply_multipliers_running=true
  }

  let validated_multipliers = validate_autoprice_multipliers()
  if(validated_multipliers.length==0 && !only_enabled){
    show_auto_pricing_enable_not_allowed("Can't save current settings, multipliers are not valid")
  }else{
    if(document.getElementById("usd-enable-checkbox").checked) document.getElementById("usd-enable-checkbox").click()
    if(!only_enabled) $(".apm-apply-parent button span").html(`<i class="fa-solid fa-circle-notch fa-spin"></i>`)
    let cerr=''
    let apires = await call_api('configure_auto_pricing', {
      "server_id": current_open_server_id,
      "enabled": document.getElementById("automated-pricing-enable-checkbox").checked,
      "spot_multiplier": validated_multipliers[1],
      "on_demand_multiplier": validated_multipliers[0]
    }).catch(function (err) {
      cerr = err;
    });
    if(!only_enabled) $(".apm-apply-parent button span").html(`Apply settings`)
    if(cerr){
      show_auto_pricing_enable_not_allowed("Cannot apply settings, connection error")
    }else if(apires?.status !== 'ok'){
      show_auto_pricing_enable_not_allowed("Failure configuring settings")
    }
  }
  if(!only_enabled) apply_multipliers_running=false
}

function enable_pricing_check(){
  if(last_open_server_status===null){
    show_auto_pricing_enable_not_allowed("Automated pricing can be enabled only on online servers")
    return false
  }else if(last_open_server_status!=3){
    show_auto_pricing_enable_not_allowed("The server needs to be in <b>Working properly</b> status")
    return false
  }else if(!last_open_server_kernel.includes('hive')){
    show_auto_pricing_enable_not_allowed("This option is only available for Servers running on HiveOS")
    return false
  }
  return true
}

async function handle_autoprice_enable_checkbox_outcome(checkbox){
  if (checkbox.checked) {
    $(".automated-pricing-body").css("display", "initial")
  } else {
    $(".automated-pricing-body").css("display", "none")
    multipliers_apply(true)
  }
}

function click_auto_pricing_enable_checkbox(event){
  const checkbox = document.getElementById('automated-pricing-enable-checkbox');
  if(checkbox.disabled) return
  if (event.target.tagName.toLowerCase() === 'input'){
    if(checkbox.checked){
      let enabled_allowed = enable_pricing_check()
      if(!enabled_allowed){
        checkbox.checked=false
      }
    }
    handle_autoprice_enable_checkbox_outcome(checkbox)
    return;
  }
  checkbox.checked = !checkbox.checked;
  if (checkbox.checked) {
    let enabled_allowed = enable_pricing_check()
    if(!enabled_allowed){
      checkbox.checked=false
    }
  }
  handle_autoprice_enable_checkbox_outcome(checkbox)
}

function handle_usd_prices_checkbox(event) {
  const is_checked = event.target.checked;

  $('.rs-prices-usd_inputs_container').toggleClass('hide', !is_checked);

  $('#rs-od-btc').toggleClass('aero-input_disabled', is_checked).prop('disabled', is_checked);
  $('#rs-od-CLORE-Blockchain').toggleClass('aero-input_disabled', is_checked).prop('disabled', is_checked);
  $('#rs-spot-btc').toggleClass('aero-input_disabled', is_checked).prop('disabled', is_checked);
  $('#rs-spot-CLORE-Blockchain').toggleClass('aero-input_disabled', is_checked).prop('disabled', is_checked);
  if (is_checked) {
    handle_usd_inputs('rs-spot-usd', 'rs-spot-btc', 'rs-spot-CLORE-Blockchain');
    handle_usd_inputs('rs-od-usd', 'rs-od-btc', 'rs-od-CLORE-Blockchain');
  } else {
    const current_open_server = glob_ms?.find(server => server.id === current_open_server_id);
    const od_btc = current_open_server?.pricing.bitcoin ?? bitcoin_min_pricing_limit;
    const od_clore = current_open_server?.pricing['CLORE-Blockchain'] ?? clore_min_pricing_limit;
    const spot_btc = current_open_server?.min_spot_pricing.bitcoin ?? bitcoin_min_pricing_limit;
    const spot_clore = current_open_server?.min_spot_pricing['CLORE-Blockchain'] ?? clore_min_pricing_limit;
    $('#rs-od-btc').val(od_btc);
    $('#rs-od-CLORE-Blockchain').val(od_clore);
    $('#rs-spot-btc').val(spot_btc);
    $('#rs-spot-CLORE-Blockchain').val(spot_clore);
  }
}

function onboard_handle_usd_prices_checkbox(event) {
  const is_checked = event.target.checked

  $(".onboard-prices-usd_inputs_container").toggleClass("hide", !is_checked)

  $("#mo-od-btc").toggleClass("aero-input_disabled", is_checked).prop("disabled", is_checked)
  $("#mo-od-CLORE-Blockchain").toggleClass("aero-input_disabled", is_checked).prop("disabled", is_checked)
  $("#mo-spot-btc").toggleClass("aero-input_disabled", is_checked).prop("disabled", is_checked)
  $("#mo-spot-CLORE-Blockchain").toggleClass("aero-input_disabled", is_checked).prop("disabled", is_checked)
  if (is_checked) {
    let any_err = handle_usd_inputs('onboard-rs-od-usd', 'mo-od-btc', 'mo-od-CLORE-Blockchain')
    if(!any_err) any_err = handle_usd_inputs('onboard-rs-spot-usd', 'mo-spot-btc', 'mo-spot-CLORE-Blockchain')
    if(!any_err) any_err = validate_mass_onboard_pricing('mo-spot-CLORE-Blockchain', 'CLORE Blockchain');
  }else{
    validate_mass_onboard_pricing('mo-spot-CLORE-Blockchain', 'CLORE Blockchain');
  }
  generate_mass_onboarding_config()
}

async function handleChangeVpnServerStatus(name, bool) {
  let cerr = '';
  await call_api('server_update_vpn_status', { name, is_vpn_enabled: bool }
  ).catch(function (err) {
     cerr = err;
  });
}

function render_server_rating(server_rating){
  if(server_rating === null) return;

  const serverRating = {
    ratingAverage: server_rating?.avg || 0,
    ratingCount: server_rating?.cnt || 0
  };

  function generateServerRatingStars(starRating) {
    const maxStarsCount = 5;
    let starTemplate = '';
    const fillStars = Math.floor(starRating);
    const halfStar = (starRating % 1) != 0;

    for (let i = 1; i <= maxStarsCount; i++) {
        if (i <= fillStars)  starTemplate += getStar('filled');
        else if (i === fillStars + 1 && halfStar) starTemplate += getStar('half');
        else starTemplate += getStar('empty');
      }
      return starTemplate;
    }

    function getStar(type) {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <mask id="mask0_2631_13740" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="1" y="0" width="22" height="22">
            <path d="M11.4613 1.09032C11.6814 0.644373 12.3173 0.644373 12.5374 1.09032L15.3865 6.86316C15.4739 7.04025 15.6428 7.16299 15.8382 7.19139L22.2089 8.1171C22.7011 8.18861 22.8976 8.7934 22.5415 9.14052L17.9316 13.634C17.7902 13.7719 17.7256 13.9705 17.759 14.1651L18.8473 20.5101C18.9313 21.0002 18.4169 21.374 17.9767 21.1426L12.2786 18.1469C12.1038 18.055 11.8949 18.055 11.7201 18.1469L6.02201 21.1426C5.58183 21.374 5.06737 21.0002 5.15144 20.5101L6.23969 14.1651C6.27307 13.9705 6.20854 13.7719 6.06713 13.634L1.45724 9.14052C1.10113 8.7934 1.29764 8.18861 1.78977 8.1171L8.16048 7.19139C8.3559 7.16299 8.52484 7.04025 8.61224 6.86316L11.4613 1.09032Z" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_2631_13740)">
            ${type === 'half' 
              ? `
                <path fill="var(--aero-salmon)" d="M0.572266 0.571289H11.4613V21.1426H0.572266z"/>
                <path fill="#D9D9D9" d="M11.4613 0.571289H22.8574V21.1426H11.4613z"/>
              `
              : type === 'empty'
              ? `<path fill="#D9D9D9" d="M0.572266 0.571289H22.8574V21.1426H0.572266z"/>`
              : `<path fill="var(--aero-salmon)" d="M0.572266 0.571289H22.8574V21.1426H0.572266z"/>`
            }
          </g>
        </svg>
      `;
    }

    $('.server-rating-myservers')
    .html(
      `
      <div class="server-rating__block">
          <div class="server-rating__name">Average server score</div>
          <div class="server-rating__info">
              <div class="server-rating__average">
                ${serverRating?.ratingAverage?.toString().replace('.', ',')}
                (${serverRating.ratingCount})
              </div>
              <div class="server-rating__stars">
                  ${generateServerRatingStars(serverRating.ratingAverage)}
              </div>
          </div>
      </div>
      `
    );
}

function setRentalLength(value) {
  rental_length = Number(value);
  $(".rental-length-h").html(value);
  $("#rs-length").val(value);
}

function initRentalSlider () {
  const sliderConfiguration = {
    min: 6,
    max: 1440,
    step: 1,
    minValue: 6,
    maxValue: rental_length,
    isSingle: true
  };
  initializeRange('rental-length-slider', sliderConfiguration);
  setRentalLength(rental_length);
}

function handleChangeRentalLength (event, value) {
  event.stopPropagation();
  const isMax = rental_length === 1440;
  const isMin = rental_length === 6;

  if (!(isMin && value === -1) && !(isMax && value === 1)) {
    rental_length = Number(rental_length) + Number(value);
    initRentalSlider();
  }
}

async function open_server(name) {
  los = name;
  let cerr = '';
  let apires = await call_api('get_my_server', { name }).catch(function (err) {
    cerr = err;
  });

  rental_length = apires['info']['mrl'];

  if (apires['info']) render_clore_mining(apires['info']);
  if (apires['bg_job_max']) bg_job_max = apires['bg_job_max'];
  if (apires['error']) {
    aero_modal_alert('market-alert', {text: 'Connection error'})
  } else if (apires['info']['initialized']) {
    let onboard_type = apires['info']?.onboard_type
    let disable_rental_settings = CONFIG_GLOBAL['onboard_disable_pricing_configuration_ids'].includes(onboard_type)
    default_oc_save_allowed = !CONFIG_GLOBAL['onboard_disable_default_oc_ids'].includes(onboard_type)
    $(".my-servder-disabled-functionality-alert").css("display", disable_rental_settings?"flex":"none")
    $(".my-servder-disabled-functionality-alert .aero-b3 b").html(`Rental Settings, Automated Pricing${default_oc_save_allowed?'':', Stock OC profile configuarion'}`)
    document.getElementById("apm-on-demand").disabled = disable_rental_settings
    document.getElementById("apm-spot").disabled = disable_rental_settings
    if(disable_rental_settings){
      $("#apm-on-demand").addClass("aero-input_disabled")
      $("#apm-spot").addClass("aero-input_disabled")
      $(".apm-top-sel .apm-input span").addClass("aero-input_disabled")
      $(".apm-bottom-sel .apm-input span").addClass("aero-input_disabled")
    }else{
      $("#apm-on-demand").removeClass("aero-input_disabled")
      $("#apm-spot").removeClass("aero-input_disabled")
      $(".apm-top-sel .apm-input span").removeClass("aero-input_disabled")
      $(".apm-bottom-sel .apm-input span").removeClass("aero-input_disabled")
    }
    document.getElementById("automated-pricing-enable-checkbox").disabled = disable_rental_settings
    current_open_server_id = apires['info']['id'];
    is_usd_autoprice = server_usd_pricing_enabled && apires['info']['autoprice'] === 'usd';
    const is_vpn_enabled = apires['info']['is_vpn_enabled'];

    if (apires['info']) {
      let displayName = apires['info']['public_name'] || apires['info']['name'];
      $('#si-cn').html(displayName.toString());
    }

    lgs = unix_timestamp();

    $('.mt-add-server').css('display', 'none');
    $('#user-servers').css('display', 'none');

    if (CONFIG_GLOBAL?.featureFlags?.shouldShowVpnBlock) {
      $('.vpn-block').css({
        'margin-bottom': '60px',
        'width': '100%'
      }).html(`
          <div class="a-title aero-h3" style="margin-bottom: 24px;">Clore VPN</div>
          <div class="clore-vpn__block">
              <label class="a-checkbox">
                <input type="checkbox" name="clore-vpn" ${is_vpn_enabled ? 'checked' : ''} onchange="handleChangeVpnServerStatus('${apires['info']['name']}', this.checked)">
                <span data-line-clamp>Apply for Clore VPN network</span>
              </label>
              <a href="https://vpn.clore.ai" class="clore-vpn__link">
                Learn more about Clore VPN
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9.5 6L15.5 12L9.5 18" stroke="#F73737" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
          </div>
      `);
    }

    $('.rental-settings').html(`
      <div class="a-title aero-h3" style="margin-bottom: 24px;">Rental settings</div>
      <div class="a-rental-form">
        <div style="width: 100%; display: flex; gap: 8px">
        <div class="a-rental-form-box">
          <div class="aero-input-wrapper">
            <div class="aero-input-sign">Availability</div>
            <div data-id="rental-availability" class="a-select js-a-select">
              <label for="rental-availability" class="a-select-wrapper js-a-select-label">
                <div class="a-select-group">
                  <div class="a-select-label" data-line-clamp>Availability</div>
                  <div class="a-select-selected js-a-select-selected" data-line-clamp></div>
                </div>
                <div class="a-select-icon js-a-select-icon">
                  <svg viewBox="0 0 16 16" class="a-select-icon-svg-plus">
                    <path fill="currentColor"
                      d="M14 8a.72.72 0 0 1-.72.72H8.72v4.56a.72.72 0 1 1-1.44 0V8.72H2.72a.72.72 0 0 1 0-1.44h4.56V2.72a.72.72 0 0 1 1.44 0v4.56h4.56A.72.72 0 0 1 14 8Z" />
                  </svg>
                  <svg viewBox="0 0 16 16" class="a-select-icon-svg-minus">
                    <path fill="currentColor"
                      d="M14 8c0 .265-.076.52-.21.707-.136.188-.319.293-.51.293H2.72c-.191 0-.374-.105-.51-.293A1.224 1.224 0 0 1 2 8c0-.265.076-.52.21-.707.136-.188.319-.293.51-.293h10.56c.191 0 .374.105.51.293.134.187.21.442.21.707Z" />
                  </svg>
                </div>
              </label>
              <ul class="a-select-dropdown js-a-select-dropdown">
                <li class="a-select-dropdown-item">
                  <button class="a-select-dropdown-button js-a-select-dropdown-button" data-value="true">
                    <span data-line-clamp>Available for Rent</span>
                  </button>
                </li>
                <li class="a-select-dropdown-item">
                  <button class="a-select-dropdown-button js-a-select-dropdown-button" data-value="false">
                    <span data-line-clamp>Unavailable for Rent</span>
                  </button>
                </li>
              </ul>
              <input id="rs-aselect" type="hidden" name="rental-availability" class="a-select-input js-a-select-input">
            </div>
          </div>
          </div>
          <div class="a-rental-form-box rental-length">
            <div class="aero-input-wrapper">
              <div class="aero-input-sign">Maximum rental length (hr)</div>
              <input id="rs-length" type="number" class="aero-input" value="${apires['info']['mrl']}" min="6" max="1440"
                onblur="handle_rs_length()">
              <div class="aero-input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round"
                    d="m14 14-2-2V7m9 5a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

          <div class="a-rental-form-box full-with">
           ${server_usd_pricing_enabled ? `<div class="rs-prices-usd_box">
              <div class="rs-prices-usd_content">
                <label class="a-checkbox">
                  <input type="checkbox" id="usd-enable-checkbox" name="is-usd-prices" ${is_usd_autoprice ? ` checked="checked"` : ``} onchange="handle_usd_prices_checkbox.call(this,event)"${disable_rental_settings?` disabled`:``}>
                </label>
                <span class="aero-b4 aero-b4_gray">
                    Calculate based on USD
                </span>
              </div>
               <div class="rs-prices-usd_inputs_container ${is_usd_autoprice ? '' : 'hide'}">
                  <div class="aero-input-wrapper" id="is_usd_prices_input_od">
                    <div class="aero-input-sign">
                      On demand pricing
                    </div>
                    <input id="rs-od-usd" type="number" class="aero-input rs-prices-usd_input_full${disable_rental_settings ? ` aero-input_disabled` : ``}" 
                        value="${apires.info.usd_pricing?.on_demand ? apires.info.usd_pricing?.on_demand : usd_min_pricing_limit}" min="${usd_min_pricing_limit}" max="${usd_max_pricing_limit}" 
                        step="0.01" onblur="handle_usd_inputs('rs-od-usd', 'rs-od-btc', 'rs-od-CLORE-Blockchain')"
                    ${disable_rental_settings ? ` disabled` : ``}>
                    <div class="aero-input-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round"
                              d="M17 6h-5M7 18h5m0-12H9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3m0-12V4m0 2v12m0 0v2"/>
                      </svg>
                    </div>
                  </div>
                  <div class="aero-input-wrapper" id="is_usd_prices_input_spot">
                    <div class="aero-input-sign">Minimal spot price</div>
                    <input id="rs-spot-usd" type="number" class="aero-input rs-prices-usd_input_full${disable_rental_settings ?` aero-input_disabled` : ``}" 
                        value="${apires.info.usd_pricing?.spot ? apires.info.usd_pricing?.spot : usd_min_pricing_limit}" min="${usd_min_pricing_limit}" max="${usd_max_pricing_limit}" step="0.01" 
                        onblur="handle_usd_inputs('rs-spot-usd', 'rs-spot-btc', 'rs-spot-CLORE-Blockchain')"
                    ${disable_rental_settings ?` disabled` : ``}>
                    <div class="aero-input-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round"
                              d="M17 6h-5M7 18h5m0-12H9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3m0-12V4m0 2v12m0 0v2"/>
                      </svg>
                    </div>
                  </div>
                </div>
             </div>` : ``}
          </div>

          <div class="rental-settings-enable-coins noselect">
            <div class="rental-settings-enable-coin">
              <label class="a-checkbox">
                <input type="checkbox" id="btc-enable-checkbox" name="on-demand-pricing-btc" ${apires['info']['allowed_coins'].includes('bitcoin') ? ` checked="checked"` : ``}>
              </label>
              <span onclick='document.getElementById("btc-enable-checkbox").click()'>Enable BTC payments</span>
            </div>
            <div class="rental-settings-enable-coin">
              <label class="a-checkbox">
                <input type="checkbox" id="CLORE-Blockchain-enable-checkbox" ${apires['info']['allowed_coins'].includes('CLORE-Blockchain') ? ` checked="checked"` : ``}>
              </label>
              <span onclick='document.getElementById("CLORE-Blockchain-enable-checkbox").click()'>Enable CLORE payments</span>
            </div>
          </div>
          
          <div style="display: flex; flex-direction: row; width: 100%; gap: 8px">
          <div class="a-rental-form-box">
          <div class="aero-input-wrapper">
            <div class="aero-input-sign">
              On demand pricing (BTC)
            </div>
            <input id="rs-od-btc" type="number" class="aero-input ${(is_usd_autoprice || disable_rental_settings) ? "aero-input_disabled": ""}" value="${apires['info']['pricing']['bitcoin'].toFixed(8)}" min="${bitcoin_min_pricing_limit}" max="${bitcoin_max_pricing_limit}"
              step="0.00000001" onblur="handle_od_btc()" ${(is_usd_autoprice || disable_rental_settings) ? ` disabled` : ``}>
            <div class="aero-input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 25">
                <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".6"
                  stroke-width="1.5"
                  d="M6 6.5h8a3 3 0 0 1 0 6m0 0a3 3 0 0 1 0 6H6m8-6H8m0-6v12m1-15v3m4-3v3m-4 12v3m4-3v3" />
              </svg>
            </div>
          </div>
          <div class="aero-input-wrapper">
            <div class="aero-input-sign">Minimal spot price (BTC)</div>
            <input id="rs-spot-btc" type="number" class="aero-input ${(is_usd_autoprice || disable_rental_settings) ? "aero-input_disabled": ""}" value="${apires['info']['spot_pricing']['bitcoin'].toFixed(8)}" min="${bitcoin_min_pricing_limit}" max="${bitcoin_max_pricing_limit}"
              step="0.00000001" onblur="handle_spot_btc()" ${(is_usd_autoprice || disable_rental_settings) ? ` disabled` : ``}>
            <div class="aero-input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 25">
                <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".6"
                  stroke-width="1.5"
                  d="M6 6.5h8a3 3 0 0 1 0 6m0 0a3 3 0 0 1 0 6H6m8-6H8m0-6v12m1-15v3m4-3v3m-4 12v3m4-3v3" />
              </svg>
            </div>
          </div>
        </div>

        <div class="a-rental-form-box">
          <div class="aero-input-wrapper">
            <div class="aero-input-sign">
              On demand pricing (CLORE)
            </div>
            <input id="rs-od-CLORE-Blockchain" type="number" class="aero-input ${(is_usd_autoprice || disable_rental_settings) ? "aero-input_disabled": ""}" value="${(apires['info']['pricing']['CLORE-Blockchain'] ? apires['info']['pricing']['CLORE-Blockchain'] : clore_min_pricing_limit).toFixed(2)}" min="${clore_min_pricing_limit}" max="${clore_max_pricing_limit}"
              step="0.01" onblur="handle_od_universal('rs-od-CLORE-Blockchain', ${clore_min_pricing_limit}, ${clore_max_pricing_limit}, 2)" ${(is_usd_autoprice || disable_rental_settings) ? ` disabled` : ``}>
            <div class="aero-input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 25">
                <path fill="#fff" fill-opacity=".6"
                  d="M17 4.014c-1.453-.946-2.724-1.388-4.66-1.514-1.817 1.766-1.756 5.36 0 7 .726-3.027 2.42-4.667 4.66-5.486ZM19.517 5.504C16.414 5.378 14 7.971 14 10.5c2.552-1.58 5.517-1.644 8-.38-.414-2.023-1.197-3.09-2.483-4.616ZM22 12.799c-1.782-1.832-5.282-1.649-7 .061 2.806.654 4.327 1.893 5.6 4.64.972-1.539 1.4-2.686 1.4-4.701ZM19 19.948c-.19-3.31-2.25-5.257-5-5.448 1.423 2.713 1.709 5.241.443 8 1.89-.564 2.975-1.103 4.557-2.552ZM11.643 22.5c1.749-1.829 1.87-4.793 0-7-.724 3.09-2.291 4.667-4.643 5.55 1.62 1.033 2.671 1.266 4.643 1.45ZM4.353 19.5C7.173 19.227 9 17.312 9 14.5c-1.75 1.438-4.707 1.625-7 .563.64 1.941 1.15 2.956 2.353 4.437ZM2.001 12.15c1.59 1.674 4.9 1.922 6.999 0-2.99-.682-4.742-2.4-5.536-4.65-.89 1.302-1.491 3.1-1.463 4.65ZM5 5.12c.443 3.311 2.089 5.104 5 5.38-1.47-2.648-1.582-5.172-.506-8C7.405 3.052 6.3 3.812 5 5.12Z" />
              </svg>
            </div>
          </div>
          <div class="aero-input-wrapper">
            <div class="aero-input-sign">Minimal spot price (CLORE)</div>
            <input id="rs-spot-CLORE-Blockchain" type="number" class="aero-input ${(is_usd_autoprice || disable_rental_settings) ? "aero-input_disabled": ""}" value="${(apires['info']['spot_pricing']['CLORE-Blockchain'] ? apires['info']['spot_pricing']['CLORE-Blockchain'] : clore_min_pricing_limit).toFixed(2)}" min="${clore_min_pricing_limit}" max="${clore_max_pricing_limit}"
              step="0.01" onblur="handle_od_universal('rs-spot-CLORE-Blockchain', ${clore_min_pricing_limit}, ${clore_max_pricing_limit}, 2)" ${(is_usd_autoprice || disable_rental_settings) ? ` disabled` : ``}>
            <div class="aero-input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 25">
                <path fill="#fff" fill-opacity=".6"
                  d="M17 4.014c-1.453-.946-2.724-1.388-4.66-1.514-1.817 1.766-1.756 5.36 0 7 .726-3.027 2.42-4.667 4.66-5.486ZM19.517 5.504C16.414 5.378 14 7.971 14 10.5c2.552-1.58 5.517-1.644 8-.38-.414-2.023-1.197-3.09-2.483-4.616ZM22 12.799c-1.782-1.832-5.282-1.649-7 .061 2.806.654 4.327 1.893 5.6 4.64.972-1.539 1.4-2.686 1.4-4.701ZM19 19.948c-.19-3.31-2.25-5.257-5-5.448 1.423 2.713 1.709 5.241.443 8 1.89-.564 2.975-1.103 4.557-2.552ZM11.643 22.5c1.749-1.829 1.87-4.793 0-7-.724 3.09-2.291 4.667-4.643 5.55 1.62 1.033 2.671 1.266 4.643 1.45ZM4.353 19.5C7.173 19.227 9 17.312 9 14.5c-1.75 1.438-4.707 1.625-7 .563.64 1.941 1.15 2.956 2.353 4.437ZM2.001 12.15c1.59 1.674 4.9 1.922 6.999 0-2.99-.682-4.742-2.4-5.536-4.65-.89 1.302-1.491 3.1-1.463 4.65ZM5 5.12c.443 3.311 2.089 5.104 5 5.38-1.47-2.648-1.582-5.172-.506-8C7.405 3.052 6.3 3.812 5 5.12Z" />
              </svg>
            </div>
          </div>
        </div>
        </div>
      </div>

        <div id="cs-ba"></div>

        <div class="rental-footer">
          <button id="ms-apply-btn" type="button" class="aero-btn-primary" onclick="rs_set()">
            <span id="ms-apply-btn">Apply</span>
          </button>
        </div>
      `);

    if(CONFIG_GLOBAL?.featureFlags.shouldShowServerRating){
      if(apires['info']['server_rating']){
        render_server_rating(apires['info']['server_rating']);
      }
    }

    let availability = apires['info']['visibility'] === 'hidden' ? 'false' : 'true';

    initializeSelect('rental-availability', availability, {onChange: () => rs_aselect()});
    initializeSelect('rental-length', rental_length, {});
    initRentalSlider();

    document.getElementById('rs-aselect').value = availability;

    rs_aselect();

    if (apires['info']['mfp_usd']) {
      $('.si-ni-fp').html(
        `<span>Maximum fair price: ${apires['info']['mfp_usd'].toFixed(3)} USD/day</span>`,
      );
      $('.si-ni-fp').css('display', 'flex');
    } else if (apires['info']['mfp']) {
      $('.si-ni-fp').html(
        `<span>Maximum fair price: ${apires['info']['mfp'].toFixed(8)} BTC/day</span>`,
      );
      $('.si-ni-fp').css('display', 'flex');
    } else {
      $('.si-ni-fp').html(
        `<span>Maximum fair price: Not assigned yet</span>`,
      );
      $('.si-ni-fp').css('display', 'flex');
      //$(".si-ni-fp").css("display","none")
    }

    render_cs_status(apires['info']['online']);
    render_rt_status(apires['info']['rental_status']);
    render_ss_status(apires['info']['monitoring'], apires['info']['online']);
    render_last_pow_stats(apires?.info?.last_pow_stats)
    render_auto_pow_pricing_multipliers(
      apires?.info?.multipliers?.on_demand || 1.6,
      apires?.info?.multipliers?.spot || 1.4
    )

    render_remaining_time(apires['info']['remaining_time']);
    serverRemaingTimer(apires['info']['remaining_time']);

    if(apires?.info?.autoprice==='pow'){
      $(".automated-pricing-body").css("display", "initial")
      document.getElementById("automated-pricing-enable-checkbox").checked = true
    }else{
      $(".automated-pricing-body").css("display", "none")
      document.getElementById("automated-pricing-enable-checkbox").checked = false
    }

    if (apires['info']['specs']) {
      let backend_version = apires['info']['specs']['backend_version']
        ? apires['info']['specs']['backend_version']
        : 0;
      $('.rb-b-s').css('display', backend_version > 5 ? 'block' : 'none');
      g_c_machine_backend_version = backend_version;
      let backend_str =
        backend_version > 5
          ? backend_version > 7
            ? backend_version - 3
            : backend_version - 2
          : backend_version;
      if (backend_version === 9) {
        backend_str = '5.1';
      } else if (backend_version === 10) {
        backend_str = '5.2';
      } else if (backend_version > 10) {
        backend_str = `5.2.${parseInt(backend_version)-10}`;
      }
      $(".automated-pricing").css("display", backend_version>=13?"flex":"none")
      if (backend_version < current_backend_version) {
        if (backend_str.toString() === '0') {
          $('.backend-info').html(
            `<span>Backend is still initializing</span>`,
          );
        } else if (backend_version < 3 && backend_version > 0) {
          $('.backend-info').html(
            `<span>Backend too old (v${backend_version === 4 ? `3.1` : backend_str}), server will be hidden from marketplace on April 16<br><a href="https://clore.ai/articles/order-logs#article03-5g"><i class="fa-solid fa-arrow-up-right-from-square"></i> Backend update guide</a></span>`,
          );
        } else {
          $('.backend-info').html(
            `<span>Backend is not up to date (v${backend_version === 4 ? `3.1` : backend_str}), when you have free time please update <br><a href="/articles/overclocking#avideo1-6y"><i class="fa-solid fa-arrow-up-right-from-square"></i> Backend update guide</a></span>`,
          );
        }
      } else {
        $('.backend-info').html(
          `Backend up to date (v${backend_version === 4 ? `3.1` : backend_str})`,
        );
      }
      if ((backend_version > 5 && backend_version < 7) || backend_version > 8) {
        // OC Ready
        let clock_lock_ranges = apires?.info?.clock_lock_ranges
        let oc_lock_table_td = ''
        let last_gpu_id = 0
        if (Array.isArray(clock_lock_ranges?.gpus)){
          for(var gpu_id=0; gpu_id < clock_lock_ranges?.gpus.length; gpu_id++){
            let range = clock_lock_ranges[`ranges-${clock_lock_ranges?.gpus[gpu_id]}`]
            try{
              let mem_clock_locks = Object.keys(range)
              mem_clock_locks.forEach(mem_clock_lock => {
                let c_core_range = range[mem_clock_lock]
                oc_lock_table_td +=`<tr${last_gpu_id!=gpu_id?' class="new-gpu-deliminator-lock-table"':''}>
  <td>#${gpu_id}</td>
  <td>${mem_clock_lock} Mhz</td>
  <td>${c_core_range[0]} - ${c_core_range[1]}</td>
</tr>`
                last_gpu_id = gpu_id
              })
            }catch(e){}
          }
        }
        /**/

        if (apires['info']['allow_oc'] && apires['info']['oc_gpus']) {
          $('.oc-job').css('display', 'flex');
          $('.oc-in-content').html(`                    <div class="oc-s-working-parent">
                        <div class="oc-s-working-child">
                            <span><i class="fa-solid fa-cog fa-spin"></i></span>
                        </div>
                    </div>
                    ${
            apires['info']['xorg_valid']
              ? ``
              : `<div class="oc-xorg-err">
                        <span>${backend_version > 8 ? `⏳ Overclocking is initializing, it should be functional within a few minutes if machine functions correctly` : `⚠️ X.Org error, overclocking isn't functional, if this happened few minutes after installing/bootup give it some time`}</span>
                    </div>`
          }
                    <span class="bg-s aero-b4">Overclocking profile:</span>
                    <div class="oc-profiles" onclick="toggle_oc_profile_sel()">
                        <div class="no-img-name noselect">
                            <span id="s-oc-profile">Stock</span>
                        </div>
                        <div class="s-oc-open-stat">
                          <svg class="down" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 8.5H13M8 3.5L8 13.5" stroke="white" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </div>
                    </div>
                    <div id="s-oc-profiles">
                        <div class="s-oc-abs-parent"></div>
                    </div>
                    <div class="oc-s-alert ba-fd"></div>
                    <div class="oc-change-submit-err"></div>
                    <div class="clocks-info-box">
                        <span class="aero-b3"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 7H12.009M12 17V11H11M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" stroke-opacity="0.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg> Offsets are in real MHz, so the same as on windows, you want to input half of what you input on HiveOS etc.</span>
                    </div>
                    <div class="clock-stock-modification-box">
                      <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 7V13M12 17H12.009M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                      <span class="aero-b3">Modifying stock profile leads to delisting from mainline market, your machine will only be available on power efficient marketplace. (This is only for hosts, that are not able to reach default level Power Limits)</span>
                    </div>
                    <div class="gpu-table-wrapper">
                      <div class="oc-gpu-lock-table-opener noselect" onclick="oc_table_opener_click()"${backend_version<17?` style="display: none;"`:``}>
                        <i class="fa-solid fa-caret-right"></i>
                        <span>Show allowed Mem, Core Locks</span>
                      </div>
                      <div class="oc-gpu-lock-table"${backend_version<17?` style="display: none;"`:``}>
                        <div class="oc-gpu-lock-table-info">
                          <span>*This table shows possible configurations for Core & Memory clock lock. It might have been thought, that any memory lock frequency can be configured as some platforms allow to input any number, but in the end the nvidia driver only allows to set specific lock clock for memory
                            <br><br>*Core clock locks can be configured more freely, as the nvidia driver accepts them at 15MHz steps
                            <br><br>*In the end any number can be inputed as clock lock, it will be handled by the nvidia driver and applied as the most closest clock lock
                            <br><br>*To achieve more exact clocks it might be required to use clock lock + offset at the same time
                            <br><br>*For mining grade machines it's recommend to set up overclocks suting best mining workloads
                            <br>*For AI grade machines (RTX 3090, RTX 4090, etc.), high end CPU it's recommend to leave the default OC profile at stock setting
                            ${(apires?.info?.kernel || '').includes('hive')? `<br><br>*When using HiveOS flightsheet as background job please configure OC under HiveOS, these settings have only impacts on orders running throut CLORE.AI`: ``}</span>
                        </div>
                        <div class="flexbreak"></div>
                        <div class="oc-gpu-lock-box">
                          <table>
                            <tr>
                              <th>GPU</th>
                              <th>Memory clock</th>
                              <th>Core clocks (MHz) 15 MHz steps</th>
                            </tr>
                            ${oc_lock_table_td}
                          </table>
                        </div>
                      </div>
                      <div class="oc-gpu-table">
  
                      </div>
                      <div class="oc-s-profile-cost oc-s-btc-cost aero-input-wrapper">
                          <span class="bg-s aero-input-sign">Bitcoin cost (BTC/day)</span>
  <!--                        <div class="oc-s-profile-inner">-->
                              <div class="oc-profile-cost-currency-left">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 6H14C14.7956 6 15.5587 6.31607 16.1213 6.87868C16.6839 7.44129 17 8.20435 17 9C17 9.79565 16.6839 10.5587 16.1213 11.1213C15.5587 11.6839 14.7956 12 14 12M14 12C14.7956 12 15.5587 12.3161 16.1213 12.8787C16.6839 13.4413 17 14.2044 17 15C17 15.7956 16.6839 16.5587 16.1213 17.1213C15.5587 17.6839 14.7956 18 14 18H6M14 12H8M8 6V18M9 3V6M13 3V6M9 18V21M13 18V21" stroke="#A4A4A4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                              </div>
                              <div class="oc-profile-cost-number">
                                  <input id="oc-s-btc-cost" type="number" oninput="handle_oc_btc()" min="0" max="${bitcoin_max_pricing_limit}" step="0.00000001" class="aero-input">
                              </div>
  <!--                        </div>-->
                      </div>
                      <div class="oc-s-profile-cost oc-s-CLORE-Blockchain-cost aero-input-wrapper">
                          <span class="bg-s aero-input-sign">CLORE cost (CLORE/day)</span>
  <!--                        <div class="oc-s-profile-inner">-->
                              <div class="oc-profile-cost-currency-left">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M17 3.51351C15.5473 2.56757 14.2762 2.12613 12.3393 2C10.5234 3.76576 10.584 7.36034 12.3393 9C13.0656 5.97298 14.7604 4.33333 17 3.51351Z" fill="#A4A4A4"/>
                                  <path d="M19.5172 5.00445C16.4138 4.87798 14 7.47061 14 10C16.5517 8.41911 19.5172 8.35591 22 9.6206C21.5862 7.59708 20.8035 6.53039 19.5172 5.00445Z" fill="#A4A4A4"/>
                                  <path d="M22 12.2989C20.2182 10.4674 16.7182 10.6505 15 12.36C17.8059 13.0138 19.3273 14.2526 20.6 17C21.5716 15.4612 22 14.3137 22 12.2989Z" fill="#A4A4A4"/>
                                  <path d="M19 19.4483C18.8101 16.1379 16.7501 14.1906 14 14C15.4234 16.7126 15.7089 19.2414 14.4431 22C16.3327 21.4362 17.4177 20.8966 19 19.4483Z" fill="#A4A4A4"/>
                                  <path d="M11.6429 22C13.3916 20.1712 13.5121 17.2072 11.6429 15C10.9194 18.0901 9.35162 19.6667 7 20.5495C8.61945 21.583 9.67102 21.8162 11.6429 22Z" fill="#A4A4A4"/>
                                  <path d="M4.35345 19C7.17255 18.7272 9 16.8125 9 14C7.24998 15.4375 4.2931 15.625 2 14.5625C2.64037 16.5041 3.14961 17.5193 4.35345 19Z" fill="#A4A4A4"/>
                                  <path d="M2.00096 11.6499C3.59165 13.3239 6.90028 13.5719 9 11.6499C6.00949 10.9679 4.25792 9.25054 3.4644 7C2.57371 8.30198 1.97259 10.1007 2.00096 11.6499Z" fill="#A4A4A4"/>
                                  <path d="M5 4.62069C5.44305 7.93103 7.08861 9.72412 10 10C8.53048 7.35209 8.41771 4.82759 9.49366 2C7.40508 2.55172 6.30054 3.31197 5 4.62069Z" fill="#A4A4A4"/>
                                </svg>
                              </div>
                              <div class="oc-profile-cost-number">
                                  <input id="oc-s-CLORE-Blockchain-cost" type="number" oninput="handle_oc_universal('oc-s-CLORE-Blockchain-cost', 0, ${clore_max_pricing_limit}, 2)" min="0" max="${clore_max_pricing_limit}" step="0.01" class="aero-input">
                              </div>
  <!--                        </div>-->
                      </div>
                      <div class="oc-s-profile-cost oc-s-usd-cost aero-input-wrapper" style="display:none;">
                          <span class="bg-s aero-input-sign">USD cost (USD/day)</span>
  <!--                        <div class="oc-s-profile-inner">-->
                              <div class="oc-profile-cost-currency-left">
                                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.7 8C16.501 7.43524 16.1374 6.94297 15.6563 6.58654C15.1751 6.23011 14.5983 6.02583 14 6H10C9.20435 6 8.44129 6.31607 7.87868 6.87868C7.31607 7.44129 7 8.20435 7 9C7 9.79565 7.31607 10.5587 7.87868 11.1213C8.44129 11.6839 9.20435 12 10 12H14C14.7956 12 15.5587 12.3161 16.1213 12.8787C16.6839 13.4413 17 14.2044 17 15C17 15.7956 16.6839 16.5587 16.1213 17.1213C15.5587 17.6839 14.7956 18 14 18H10C9.40175 17.9742 8.82491 17.7699 8.34373 17.4135C7.86255 17.057 7.49905 16.5648 7.3 16M12 3V6M12 18V21" stroke="#A4A4A4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                              </div>
                              <div class="oc-profile-cost-number">
                                  <input id="oc-s-usd-cost" type="number" oninput="handle_oc_usd()" min="0" max="200" step="0.01" class="aero-input">
                              </div>
  <!--                        </div>-->
                      </div>
                      <div class="oc-s-buttons">
                          <button class="aero-btn-secondary oc-s-profile-rm-btn noselect" onclick="remove_oc_profile()">
                              <span>Remove Profile</span>
                          </button>
                          <button class="aero-btn-primary oc-s-profile-save-btn noselect" onclick="save_oc_profile()">
                              <span>Apply Changes</span>
                          </button>
                      </div>
                     </div>`);
          if (hive_flightsheet_selected) {
            $('.bg-show-oc').css('display', 'none');
          } else if (apires['info']['oc']) {
            $('.bg-show-oc').css('display', 'flex');
            should_show_oc_in_background_job = true;
            select_bg_oc_profile(apires['info']['oc']);
          } else {
            $('.bg-show-oc').css('display', 'flex');
            should_show_oc_in_background_job = true;
            select_bg_oc_profile(-2);
          }
          last_stock_oc_override = apires['info']['stock_oc_override']
            ? apires['info']['stock_oc_override']
            : {};
          render_server_oc(
            apires['info']['oc_gpus'],
            apires['info']['oc_profiles'] ? apires['info']['oc_profiles'] : [],
            apires['info']['allowed_coins'].includes('bitcoin'),
            apires['info']['allowed_coins'].includes('usd'),
            apires['info']['allowed_coins'].includes('CLORE-Blockchain'),
          );
        } else if (apires['info']['allow_oc']) {
          should_show_oc_in_background_job = false;
          last_stock_oc_override = {};
          $('.oc-job').css('display', 'flex');
          $('.bg-show-oc').css('display', 'none');
          $('.oc-in-content').html(`<div class="oc-deploying">
                        <span>Overclocking Changes are deploying <i class="fa-solid fa-circle-notch fa-spin"></i></span>
                    </div>`);
        } else {
          last_stock_oc_override = {};
          $('.oc-job').css('display', 'flex');
          $('.bg-show-oc').css('display', 'none');
          if (backend_version > 8) {
            $('.oc-in-content').html(`<div class="oc-disabled">
    <span>Overclocking is activating, please wait ⏳</span><div class="flexbreak"></div>
</div>`);
          } else {
            $('.oc-in-content').html(`<div class="oc-disabled">
    <span>You can offer overclocking of your machine to your clients for extra fee, you can also setup overclock for your background job</span><div class="flexbreak"></div>
    <div class="oc-enable">
        <div class="oc-enable-btn oc-enable-custom" onclick="first_enable_oc()">
            <span>Enable Overclocking</span>
        </div>
    </div>
</div>`);
          }
        }
      } else {
        last_stock_oc_override = {};
        $('.bg-show-oc').css('display', 'none');
        $('.oc-job').css('display', 'none');
      }
    } else {
      last_stock_oc_override = {};
    }
    $('#server-view').css('display', 'flex');
    //TODO: удалить для прода
    // apires['grafana'] =
    //   `https://freddy-grafana.clore.ai/d-solo/O-TeQkLIk/server-23992-income-statistics?orgId=1&panelId=2`;
    if (apires['grafana'] === 'server-error') {
      $('.rental-s-chart').html(
        `<div class="grafana-loading"><i class="fa-solid fa-cog fa-spin"></i></div>`,
      );
    } else if (apires['grafana'] === 'no-graph') {
      $('.rental-s-chart').html(
        `<div class="grafana-loading"><i class="fa-solid fa-cog fa-spin"></i></div>`,
      );
    } else if (apires['grafana']) {
      $('.rental-s-chart').html(`<div class="grafana-timeframes noselect">
                <div class="grafana-time-btn" data-server-period="6h" onclick="set_grafana('6h')">
                    <span>6h</span>
                </div>
                <div class="grafana-time-btn active-btn" data-server-period="24h" onclick="set_grafana('24h')">
                    <span>24h</span>
                </div>
                <div class="grafana-time-btn" data-server-period="7d" onclick="set_grafana('7d')">
                    <span>7d</span>
                </div>
                <div class="grafana-time-btn" data-server-period="14d" onclick="set_grafana('14d')">
                    <span>14d</span>
                </div>
            </div><div class="flexbreak"></div><iframe id="grafana-f" src="${apires['grafana']}&from=now-24h&to=now" style="width: 100%;"></iframe>`);
    }
    let test_history = apires?.info?.specs?.net?.test_history || []
    $(".server-benchmark-top-down-speed").html(parseFloat(apires?.info?.specs?.net?.down || 0).toFixed(2))
    $(".server-benchmark-top-up-speed").html(parseFloat(apires?.info?.specs?.net?.up || 0).toFixed(2))
    let benchmarks_html = apires.pending_internet_benchmark ? `<div class="server-internet-benchmark-result">
  <span>Now</span>
  <span>Pending</span>
  <span>To be measured</span>
  <span>To be measured</span>
</div>` : ''
    if(test_history.length==0 && benchmarks_html==''){
      benchmarks_html = `<div class="server-internet-benchmarks-none"><span><i class="fa-solid fa-gauge-high"></i> There are no benchmarks</span></div>`
    }else{
      test_history.reverse().forEach(net_benchmark => {
        let benchmark_values = net_benchmark.split('|')
        let date = new Date(parseInt(benchmark_values[1])*1000)
        benchmarks_html+=`<div class="server-internet-benchmark-result${benchmark_values.length==4 && benchmark_values[0]=='S'?'':" server-internet-benchmark-failed"}">`
        benchmarks_html+=`<span>${date.getHours()<10?'0'+date.getHours():date.getHours()}:${date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()}:${date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()} ${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}</span>`
        if(benchmark_values.length==4 && benchmark_values[0]=='S'){
          benchmarks_html+=`<span>Success</span><span>${parseFloat(benchmark_values[2])} Mbps</span><span>${parseFloat(benchmark_values[3])} Mpbs</span>`
        }else{
          benchmarks_html+=`<span>Failure</span><span>N/A Mbps</span><span>N/A Mpbs</span>`
        }
        benchmarks_html+=`</div>`
      })
    }
    $(".internet-benchmarks-body").html(benchmarks_html)
    try {
      let s_img = '',
        init_command = [`#!/bin/sh`, `#HERE YOU CAN WRITE YOUR INIT SCRIPT`].join('\n');
      if (apires['info']['background_job']) {
        if (apires['info']['background_job']['image']) {
          s_img = apires['info']['background_job']['image'].toString();
        } else {
          s_img = `Select one`;
        }
        if (Object.keys(apires['info']['background_job']).includes('command')) {
          init_command = apires['info']['background_job']['command'];
        }
      } else {
        s_img = `Select one`;
      }
      let kernel = '';
      try {
        kernel = apires['info']['kernel'];
      } catch (e2) {
      }
      last_open_server_kernel=kernel
      show_bg(init_command, s_img, apires['mining_allowed'], kernel);
      // bg_select_img(s_img)
    } catch (e) {
    }
  } else {
    $('.mt-add-server').css('display', 'none');
    $('#user-servers').css('display', 'none');
    $('#server-init').css('display', 'block');
    $('.mt-ms-user-servers-init__video').html(init_youtube);
    $('#sp-tb-id').val( apires['info']['init_communication_token']);

    if (apires['info']) {
      let displayName = apires['info']['public_name'] || apires['info']['name'];
      $('#ns-i-n').html(displayName.toString());
    }
  }
}

async function request_internet_benchmark(){
  $(".sub-request-internet-benchmark span").html(`<i class="fa-solid fa-circle-notch fa-spin"></i>`)
  let cerr = '';
  let apires = await call_api('benchmark_internet_speed', {
    server_id: current_open_server_id
  }).catch(function (err) {
    cerr = err;
  });
  $(".sub-request-internet-benchmark span").html(`Request Benchmark`)

  let internet_speed_body = $(".internet-benchmarks-body").html()
  if(!internet_speed_body.includes("To be measured") && apires?.status){
    $(".internet-benchmarks-body").html(`<div class="server-internet-benchmark-result">
  <span>Now</span>
  <span>Pending</span>
  <span>To be measured</span>
  <span>To be measured</span>
</div>${internet_speed_body.includes(`server-internet-benchmarks-none`)?'':internet_speed_body}`)
  }
}

function set_grafana(time_frame) {
  if ($('#grafana-f')) {
    let isc = $('#grafana-f').attr('src');
    if (isc.includes('?')) {
      $('#grafana-f').attr(
        'src',
        `${isc.split('?')[0]}?orgId=1&panelId=2&from=now-${time_frame}&to=now`,
      );
    }
  }
}

function set_uptime_grafana(time_frame) {
  if ($('#grafana-uptime-f')) {
    const activeButton = document.querySelector('.active-btn');
    if (activeButton) {
      activeButton.classList.remove('active-btn');
    }
    const button = document.querySelector(`[data-period="${time_frame}"]`);
    button.classList.add('active-btn');
    let isc = $('#grafana-uptime-f').attr('src');
    if (isc.includes('?')) {
      $('#grafana-uptime-f').attr(
        'src',
        `${isc.split('?')[0]}?orgId=1&panelId=4&from=now-${time_frame}&to=now`,
      );
    }
  }
}

function has_special_char(str) {
  return !/^[a-zA-Z 0-9_-]+$/.test(str);
}

function verify_docker_name(name, no_min_length) {
  if (
    !/^[a-zA-Z0-9:@/._-]+$/.test(name) ||
    name.length > 128 ||
    (name.length < 4 && !no_min_length) ||
    !/^[a-zA-Z0-9_]+$/.test(name.substring(0, 1))
  ) {
    return false;
  } else {
    let tp1 = name.replace(/:/g, ''),
      tp2 = name.replace(/@/g, ''),
      tp3 = name.replace(/\//g, '');
    if (
      name.length > tp1.length + 1 ||
      name.length > tp2.length + 1 ||
      name.length > tp3.length + 1
    ) {
      return false;
    } else {
      return true;
    }
  }
}

function cptxt(name) {
  const copyText = document.getElementById(name);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
}

function verify_server_name() {
  let val = document.getElementById('new-server-name').value;
  if (has_special_char(val)) {
    let newval = '';
    for (let i = 0; i < val.length; i++) {
      if (!has_special_char(val[i])) newval += val[i];
    }
    document.getElementById('new-server-name').value = newval;
  }
}

let glob_ns_n = '';

async function add_server_next() {
  const input = document.getElementById('new-server-name');
  const newname = input?.value;
  const $error = $('#mt-ms-modal-input-error');
  glob_ns_n = newname;

  $error.text('');
  input?.classList.remove('error');

  if (has_special_char(newname) || newname === '') {
    await shake('new-server-name');
  } else {
    let cerr = '';
    let apires = await call_api('add_server', { name: newname }).catch(function (err) {
      cerr = err;
    });

    if (cerr) {
      $error.text('Connection Error');
      input?.classList.add('error');
    } else if (apires['error'] === 'limited') {
      $error.text(`CLORE.AI has reached current limit of hosts (${apires['limit']}) follow our socials for future update`);
      input?.classList.add('error');
    } else if (apires['error'] === 'other_server_already_has_this_name') {
      $error.text('You already have server with this name');
      input?.classList.add('error');
    } else if (apires['error'] === 'reached_user_server_limit') {
      $error.text('You have reached server limit on your account, if you want to add more servers you need to contact support');
      input?.classList.add('error');
    } else if (apires['error']) {
      $error.text('Database error');
      input?.classList.add('error');
    } else {
      // was ok, now check if server sucesfully added
      await verify_adding_server();
      input?.classList.remove('error');
    }
  }
}

async function verify_adding_server() {
  const input = document.getElementById('new-server-name');
  const $error = $('#mt-ms-modal-input-error')

  let cerr = '',
    next_loop = true;
  let apires = await call_api('get_my_server', { name: glob_ns_n }).catch(function (err) {
    cerr = err;
  });
  if (apires['error']) {
    $error.text('Something went wrong');
    input?.classList.add('error');
  } else if (apires['creation_completed']) {
    next_loop = false;
    location.reload();
  }

  if (next_loop) {
    setTimeout(function () {
      verify_adding_server();
    }, 750);
  }
}

async function init_rm_server() {
  let cerr = '',
    next_loop = true;
  let apires = await call_api('rm_my_server', {
    name: document.getElementById('ns-i-n').innerHTML,
  }).catch(function (err) {
    cerr = err;
  });
  if (apires['error'] && apires['error'] !== 'server_dont_exist') {
  } else if (apires['status'] === 'ok' || apires['error'] === 'server_dont_exist') {
    next_loop = false;
    location.reload();
  }
  if (next_loop) {
    setTimeout(function () {
      init_rm_server();
    }, 1500);
  }
}

function init_rm_l() {
  $('.si-ni-del').html(`<span><i class="fa-solid fa-cog fa-spin"></i></span>`);
}

function render_cs_status(online) {
  const icon = `<svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="4" cy="4.5" r="4" fill="${online ? '#46CA93': '#F63737' }"/>
                </svg>`;

  $('#cs_status').html(online ? `${icon} online` : `${icon} offline`);
}

function render_rt_status(status) {
  $('#rt_status').html(status === 0 ? 'not rented' : status === 1 ? `SPOT market` : (status === 3 ? `Rented for Fixed USD price` : `On Demand`));
  // $('#rt_status').css('color', status ? '#16f804' : '#f80404');
}

function render_ss_status(monitoring, online) {
  if (online) {
    last_open_server_status=monitoring
    if (monitoring === 0) {
      $('#ss_status').html('Starting up');
    } else if (monitoring === 1) {
      $('#ss_status').html('Docker failure');
    } else if (monitoring === 2) {
      $('#ss_status').html('CUDA failure');
    } else {
      $('#ss_status').html('Working properly');
    }
  } else {
    last_open_server_status=null
    $('#ss_status').html('offline');
  }
}

function render_remaining_time(remTime) {
  const el = $('#rt_time_remaining');
  const time = getRemainingServerTimeString(remTime);
  if (el.length) {
    if (time) el.html(time);
    else el.html('Completed');
  }
}

function rs_aselect() {
  $('#rs-aselect').css(
    'background-color',
    document.getElementById('rs-aselect').value === 'true' ? 'rgb(4, 71, 9)' : 'rgb(71, 4, 4)',
  );
}

function handle_rs_length() {
  let val = document.getElementById('rs-length').value;

  if (val < 6) val = 6;
  if (val > 24 * 60) val = 24 * 60;

  if (val) document.getElementById('rs-length').value = parseInt(val);
}

function handle_od_universal(obj_id, min, max, decimals) {
  let c_val = document.getElementById(obj_id).value;
  if (c_val < min && c_val !== 0) c_val = min;
  if (c_val > max) c_val = max;
  try {
    document.getElementById(obj_id).value =
      (!c_val.toString().includes('.') ? 0 : c_val.toString().split('.')[1].length) > decimals
        ? parseFloat(c_val).toFixed(decimals)
        : c_val;
  } catch (e) {
    console.error(e);
  }
}

function handle_od_btc() {
  let c_val = document.getElementById('rs-od-btc').value;
  if (c_val < bitcoin_min_pricing_limit && c_val !== 0) c_val = bitcoin_min_pricing_limit;
  if (c_val > bitcoin_max_pricing_limit) c_val = bitcoin_max_pricing_limit;
  try {
    document.getElementById('rs-od-btc').value =
      c_val.toString().split('.')[1].length > 8 ? parseFloat(c_val).toFixed(8) : c_val;
  } catch (e) {
  }
}


function convert_usd_into_coins(coin, value) {
  if (!value) {
    return 0
  }
  const coin_in_usd = coins_in_usd[coin]

  const result = Math.max(value / coin_in_usd, 0)
  return typeof CONFIG_GLOBAL.decimals_in_pricing[coin] === 'number' ? parseFloat(result.toFixed(CONFIG_GLOBAL.decimals_in_pricing[coin])) : result
}

function handle_usd_inputs(usd_input_id, btc_input_id, clore_input_id) {
  const $btc_input = document.getElementById(btc_input_id);
  const $clore_input = document.getElementById(clore_input_id);
  const $usd_input = document.getElementById(usd_input_id);

  let usd = $usd_input.value;

  if (usd_input_id.includes('onboard')) {

    const new_btc = convert_usd_into_coins('bitcoin', usd);
    const new_clore = convert_usd_into_coins('CLORE-Blockchain', usd);

    $btc_input.value = new_btc;
    $clore_input.value = new_clore;

    validate_mass_onboard_pricing('mo-spot-CLORE-Blockchain', 'CLORE Blockchain');
    generate_mass_onboarding_config();

    let allowed_decimals = $usd_input.step.includes('.') ? $usd_input.step.split('.')[1].length : Infinity;
    let value_decimals = $usd_input.value.includes('.') ? $usd_input.value.split('.')[1].length : 0;

    let any_issue = false;
    if (usd < usd_min_pricing_limit || usd > usd_max_pricing_limit) {
      $(`#${usd_input_id}`).removeClass('price-input-correct');
      $(`#${usd_input_id}`).addClass('price-input-wrong');
      mass_onboarding_price_alert(`USD price must be in range <b>${usd_min_pricing_limit} - ${usd_max_pricing_limit}</b>`);
      any_issue = true;
    } else if (value_decimals > allowed_decimals) {
      $(`#${usd_input_id}`).removeClass('price-input-correct');
      $(`#${usd_input_id}`).addClass('price-input-wrong');
      mass_onboarding_price_alert(`USD price must have up to <b>${allowed_decimals}</b> decimal points`);
      any_issue = true;
    } else {
      $(`#${usd_input_id}`).addClass('price-input-correct');
      $(`#${usd_input_id}`).removeClass('price-input-wrong');
    }
    generate_mass_onboarding_config();
    return any_issue;
  } else {
    usd = usd < usd_min_pricing_limit ? usd_min_pricing_limit : usd > usd_max_pricing_limit ? usd_max_pricing_limit : usd;
    $usd_input.value = usd;

    const new_btc = convert_usd_into_coins('bitcoin', usd);
    const new_clore = convert_usd_into_coins('CLORE-Blockchain', usd);

    $btc_input.value = new_btc;
    $clore_input.value = new_clore;
  }
}

function handle_spot_btc() {
  let c_val = document.getElementById('rs-spot-btc').value;
  if (c_val < bitcoin_min_pricing_limit && c_val !== 0) c_val = bitcoin_min_pricing_limit;
  if (c_val > bitcoin_max_pricing_limit) c_val = bitcoin_max_pricing_limit;
  try {
    document.getElementById('rs-spot-btc').value =
      c_val.toString().split('.')[1].length > 8 ? parseFloat(c_val).toFixed(8) : c_val;
  } catch (e) {
  }
}

function handle_oc_universal(obj_id, min, max, decimals) {
  let c_val = parseFloat(document.getElementById(obj_id).value);
  if (c_val < min) {
    c_val = 0;
    document.getElementById(obj_id).value = '0';
  }
  if (c_val > max) c_val = max;
  try {
    document.getElementById(obj_id).value =
      (!c_val.toString().includes('.') ? 0 : c_val.toString().split('.')[1].length) > decimals
        ? parseFloat(c_val).toFixed(decimals)
        : c_val;
  } catch (e) {
  }
}

function handle_oc_btc() {
  let c_val = parseFloat(document.getElementById('oc-s-btc-cost').value);
  if (c_val < 0) {
    c_val = 0;
    document.getElementById('oc-s-btc-cost').value = '0';
  }
  if (c_val > bitcoin_max_pricing_limit) c_val = bitcoin_max_pricing_limit;
  try {
    document.getElementById('oc-s-btc-cost').value =
      c_val.toString().split('.')[1].length > 8 ? parseFloat(c_val).toFixed(8) : c_val;
  } catch (e) {
  }
}

function handle_oc_usd() {
  let c_val = parseFloat(document.getElementById('oc-s-usd-cost').value);
  if (c_val < 0) c_val = 0;
  if (c_val > 200) c_val = 200;
  try {
    if (parseFloat(document.getElementById('oc-s-usd-cost').value) === 0) {
    } else if (c_val.toString().includes('.')) {
      document.getElementById('oc-s-usd-cost').value =
        c_val.toString().split('.')[1].length > 2 ? parseFloat(c_val).toFixed(2) : c_val;
    } else {
      document.getElementById('oc-s-usd-cost').value = c_val;
    }
  } catch (e) {
    console.error(e);
  }
}

function get_mrl() {
  return parseInt(document.getElementById('rs-length').value);
}


async function rs_set(autopricing_policy) {
  if(!autopricing_policy && document.getElementById("automated-pricing-enable-checkbox").checked){
    show_auto_pricing_enable_not_allowed(`Updating rental settings leads to disabling of Automated Pricing.<br><br>What do you want to do?`, true)
    return;
  }

  let usd_price = usd_min_pricing_limit,
    usd_spot = usd_min_pricing_limit,
    is_usd_autoprice_enabled = false;

  const $usd_checkbox = document.getElementById('usd-enable-checkbox');

  const $od_usd_input = document.getElementById('rs-od-usd');
  const $spot_usd_input = document.getElementById('rs-spot-usd');

  const $od_btc_input = document.getElementById('rs-od-btc');
  const $spot_btc_input = document.getElementById('rs-spot-btc');

  const $od_clore_input = document.getElementById('rs-od-CLORE-Blockchain');
  const $spot_clore_input = document.getElementById('rs-spot-CLORE-Blockchain');

  const $select = document.getElementById('rs-aselect');

  const alertContainer = '#cs-ba';

  if ($usd_checkbox && $usd_checkbox.checked) {
        is_usd_autoprice_enabled = true
        usd_price = parseFloat($od_usd_input.value);
        usd_spot = parseFloat($spot_usd_input.value);
  }

  const usd_enabled = $usd_checkbox ? $usd_checkbox.checked : false
  const btc_enabled = document.getElementById('btc-enable-checkbox') ? document.getElementById('btc-enable-checkbox').checked : false

  $('#cs-ba').html('');
  $('#ms-apply-btn').html(`<i class="fa-solid fa-cog fa-spin"></i>`);
  let nb = {
      name: los,
      availability: $select.value !== 'false',
      mrl: get_mrl(),
      on_demand: parseFloat($od_btc_input.value),
      spot: parseFloat($spot_btc_input.value),
      'enabled-usd': usd_enabled,
      'enabled-btc': btc_enabled,
      ...(is_usd_autoprice_enabled ? {
        autoprice: 'usd',
        usd_spot ,
        usd_on_demand: usd_price
      } : {})
    },
    cerr = '';

  if ($od_clore_input && $spot_clore_input) {
    // Enabled $CLORE payments
    nb['enabled-CLORE-Blockchain'] = document.getElementById('CLORE-Blockchain-enable-checkbox') ? document.getElementById('CLORE-Blockchain-enable-checkbox').checked : false
    nb['CLORE-Blockchain_on_demand'] = parseFloat($od_clore_input.value);
    nb['CLORE-Blockchain_spot'] = parseFloat($spot_clore_input.value);
  }

  let api_res = await call_api('set_rs', nb).catch(function (err) {
    cerr = err;
  });

  if(autopricing_policy === "disable"){
    document.getElementById("automated-pricing-enable-checkbox").checked=false
    $(".automated-pricing-body").css("display", "none")
    $("#auto-pricing-container-aero .a-modal-close").click()
  }else if(autopricing_policy === "re-enable" && (!cerr && !api_res?.err)){
    document.getElementById("automated-pricing-enable-checkbox").checked=true
    $(".automated-pricing-body").css("display", "initial")
    multipliers_apply(true)
    $("#auto-pricing-container-aero .a-modal-close").click()
  }

  await sync_timeout(100);

  if (cerr) {
    aero_alert(alertContainer, "Connection error", "danger");
  } else if (api_res['error']) {
    aero_alert(alertContainer, "Database error", "danger");
  } else {
    aero_alert(alertContainer, "Changes applied", "success");
  }

  $('#ms-apply-btn').html(`Apply`);
  // await refetch_my_servers();
}

let set_init_sliders = false,
  set_init_selectors = false,
  for_log_gpu_min = 2,
  for_log_gpu_max = 1280,
  for_log_memory_min = 1890,
  for_log_memory_max = 10240,
  for_log_reliability = 24996,
  for_log_min_internet_up_speed = 1,
  for_log_max_internet_up_speed = 10001,
  for_log_min_internet_down_speed = 1,
  for_log_max_internet_down_speed = 10001,
  for_log_min_cpu_core = 1,
  for_log_max_cpu_core = 4096;
let relevant_s = [],
  relevant_ms = [],
  relevant_min_gpu = 1,
  relevant_max_gpu = 16,
  relevant_min_cpu_core = 1,
  relevant_max_cpu_core = 255,
  relevant_min_internet_up_speed = 0,
  relevant_max_internet_up_speed = 10000,
  relevant_min_internet_down_speed = 0,
  relevant_max_internet_down_speed = 10000,
  relevant_min_mem = 4,
  relevant_max_mem = 8192,
  relevant_gpu_mem = 2,
  relevant_gpu_max_mem = 128,
  creation_fees = {},
  relevant_min_reliability = 90,
  market_currency = 'bitcoin',
  market_gpu_filter = ['any'],
  market_cuda = 'Any',
  market_sort = 'min',
  market_type = 'mainline';

async function call_marketplace_servers(eff, init_call) {
  let mts = '';
  mts = getCookie('marketplace_query');

  const enableFilters = () => {
    enableFilter('market-cuda');
    enableFilter('filter-srs');
    enableFilter('filter-sdc');
  }

  try {
    if (mts !== '') {
      let pck = JSON.parse(atob(mts));
      if (pck['show_in_usd']) {
        show_in_usd = pck['show_in_usd'];
        $("#usd-toggle").prop('checked', show_in_usd)
      }
      if (pck['relevant_gpu_mem']) {
        relevant_gpu_mem = pck['relevant_gpu_mem'];
      }
      if (pck['relevant_gpu_max_mem']) {
        relevant_gpu_max_mem = pck['relevant_gpu_max_mem'];
      }
      if (pck['for_log_gpu_min']) for_log_gpu_min = pck['for_log_gpu_min'];
      if (pck['for_log_min_internet_up_speed']) for_log_min_internet_up_speed = pck['for_log_min_internet_up_speed']
      if (pck['for_log_max_internet_up_speed']) for_log_max_internet_up_speed = pck['for_log_max_internet_up_speed']
      if (pck['for_log_min_internet_down_speed']) for_log_min_internet_down_speed = pck['for_log_min_internet_down_speed']
      if (pck['for_log_max_internet_down_speed']) for_log_max_internet_down_speed = pck['for_log_max_internet_down_speed']
      if (pck['for_log_gpu_max']) for_log_gpu_max = pck['for_log_gpu_max'];
      if (pck['relevant_min_gpu']) {
        relevant_min_gpu = pck['relevant_min_gpu'];
      }
      if (pck['relevant_max_gpu']) {
        relevant_max_gpu = pck['relevant_max_gpu'];
      }
      if (pck['relevant_min_cpu_core']) {
        relevant_min_cpu_core = pck['relevant_min_cpu_core'];
      }
      if (pck['for_log_max_cpu_core']) for_log_max_cpu_core = pck['for_log_max_cpu_core']
      if (pck['for_log_min_cpu_core']) for_log_min_cpu_core = pck['for_log_min_cpu_core']
      if (pck['relevant_max_cpu_core']) {
        relevant_max_cpu_core = pck['relevant_max_cpu_core'];
      }
      if (pck['relevant_min_internet_up_speed']) {
        relevant_min_internet_up_speed = pck['relevant_min_internet_up_speed'];
      }
      if (pck['relevant_max_internet_up_speed']) {
        relevant_max_internet_up_speed = pck['relevant_max_internet_up_speed'];
      }
      if (pck['relevant_min_internet_down_speed']) {
        relevant_min_internet_down_speed = pck['relevant_min_internet_down_speed'];
      }
      if (pck['relevant_max_internet_down_speed']) {
        relevant_max_internet_down_speed = pck['relevant_max_internet_down_speed'];
      }
      if (pck['relevant_max_cpu_core']) {
        relevant_max_cpu_core = pck['relevant_max_cpu_core'];
      }
      if (Object.keys(pck).includes('show_rented_servers')) {
        const show_u_d = document.querySelector('[data-id="co-show-u-d"]');
        const show_u_m = document.querySelector('[data-id="co-show-u-m"]');

        show_rented_servers = pck['show_rented_servers'];
        if (show_u_d) show_u_d.checked = show_rented_servers;
        if (show_u_m) show_u_m.checked = show_rented_servers;
      }
      if (Object.keys(pck).includes('show_default_clocks')) {
        show_default_clocks = pck['show_default_clocks'];
        const show_o_d = document.querySelector('[data-id="co-show-o-d"]');
        const show_o_m = document.querySelector('[data-id="co-show-o-m"]');

        show_default_clocks = pck['show_default_clocks'];
        if (show_o_d) show_o_d.checked = show_default_clocks;
        if (show_o_m) show_o_m.checked = show_default_clocks;
      }else{
        const show_o_d = document.querySelector('[data-id="co-show-o-d"]');
        const show_o_m = document.querySelector('[data-id="co-show-o-m"]');
        if (show_o_d) show_o_d.checked = true;
        if (show_o_m) show_o_m.checked = true;
      }
      if (pck['relevant_min_mem']) relevant_min_mem = pck['relevant_min_mem'];
      if (pck['relevant_max_mem']) relevant_max_mem = pck['relevant_max_mem'];
      if (pck['for_log_memory_min']) for_log_memory_min = pck['for_log_memory_min'];
      if (pck['for_log_memory_max']) for_log_memory_max = pck['for_log_memory_max'];
      if (pck['for_log_reliability']) for_log_reliability = pck['for_log_reliability'];
      if (Object.keys(pck).includes('relevant_min_reliability')) {
        //$("#min-reliability").val(parseInt(pck["relevant_min_reliability"] * 100));
        relevant_min_reliability = pck['relevant_min_reliability'];
      }
      if (pck['market_gpu_filter'] && Array.isArray(pck['market_gpu_filter'])) market_gpu_filter = pck['market_gpu_filter'];
      if (pck['market_cuda']) market_cuda = pck['market_cuda'];
      if (pck['market_sort']) market_sort = pck['market_sort'];
      if (pck['market_type']) market_type = pck['market_type'];
      if (pck['market_country'] && Array.isArray(pck['market_country'])) market_country = pck['market_country'];
      if (pck['market_pci_port']) market_pci_port = pck['market_pci_port'];
      if (pck['market_pci_version']) market_pci_version = pck['market_pci_version'];
      if (pck['market_host_filter']) {
        market_host_filter = pck['market_host_filter'];
        $('[data-id="host-input-mob"]').val(market_host_filter);
        $('[data-id="host-input-desc"]').val(market_host_filter);
      };
      if (pck['market_rig_filter']) {
        market_rig_filter = pck['market_rig_filter'];
        $('[data-id="rig-input-mob"]').val(market_rig_filter);
        $('[data-id="rig-input-desc"]').val(market_rig_filter);
      };

      if (pck['market_currency']) {
        market_currency = pck['market_currency'];
      } else {
        market_currency = 'bitcoin';
      }
    } else {
      const show_o_d = document.querySelector('[data-id="co-show-o-d"]');
      const show_o_m = document.querySelector('[data-id="co-show-o-m"]');
      if (show_o_d) show_o_d.checked = true;
      if (show_o_m) show_o_m.checked = true;
      market_gpu_filter = ['any'];
    }
  } catch (e) {
    console.error(e);
  }

  const selectConfigurations = {
    'market-gpu': {
      data: transformGPUDataToSelectData(glob_gpu_types, market_gpu_filter),
      defaultValue: market_gpu_filter,
      onChange: (value) => changeMarketGpu(value),
    },
    'market-country': {
      data: transformDataToMultiSelectData(glob_country_types, market_country, 'Any', 'any'),
      defaultValue: market_country,
      onChange: (value) => changeMarketCountry(value),
    },
    'market-pci-port': {
      data: transformDataToSelectData(glob_pci_port_types, market_pci_port, 'Any', 'any', false, true, true),
      defaultValue: market_pci_port,
      onChange: (value) => changePciPort(value),
    },
    'market-pci-version': {
      data: transformDataToSelectData(glob_pci_version_types, market_pci_version, 'Any', 'any', true, true),
      defaultValue: market_pci_version,
      onChange: (value) => changePciVersion(value),
    },
    'market-sort': {
      data: [],
      defaultValue: 'default',
      onChange: (value) => changeMarketSort(value),
    },
    'market-type-sel': {
      data: [],
      defaultValue: 'mainline',
      onChange: (value) => changeMarketType(value),
    },
    'market-cuda': {
      data: [],
      defaultValue: 'all',
      onChange: (value) => changeMarketCuda(value),
    },
    'market-currency': {
      data: [],
      defaultValue: 'bitcoin',
      onChange: (value) => changeMarketCurrency(value),
    },
  };

  // Init selectors
  if (!set_init_selectors) {
    initializeMultiSelect('market-gpu', market_gpu_filter, selectConfigurations['market-gpu']);
    initializeSelect('market-sort', market_sort, selectConfigurations['market-sort']);
    initializeSelect('market-type-sel', market_type, selectConfigurations['market-type-sel']);
    initializeSelect('market-cuda', market_cuda, selectConfigurations['market-cuda']);
    initializeSelect('market-currency', market_currency, selectConfigurations['market-currency']);
    initializeMultiSelect('market-country', market_country, selectConfigurations['market-country']);
    initializeSelect('market-pci-port', market_pci_port, selectConfigurations['market-pci-port']);
    initializeSelect('market-pci-version', market_pci_version, selectConfigurations['market-pci-version']);
  }

  set_init_selectors = true;

  // Init range sliders
  if (!set_init_sliders) {
    const rangesConfiguration = {
      'gpu-cnt': {
        min: 1,
        max: 16,
        step: 1,
        minValue: relevant_min_gpu,
        maxValue: relevant_max_gpu,
      },
      'cpu-core': {
        min: 1,
        max: 4096,
        step: 1,
        minValue: for_log_min_cpu_core,
        maxValue: for_log_max_cpu_core,
      },
      'internet-up': {
        min: 1,
        max: 10001,
        step: 1,
        minValue: for_log_min_internet_up_speed,
        maxValue: for_log_max_internet_up_speed,
      },
      'internet-down': {
        min: 1,
        max: 10001,
        step: 1,
        minValue: for_log_min_internet_down_speed,
        maxValue: for_log_max_internet_down_speed,
      },
      'gpu-vram': {
        min: 2,
        max: 1280,
        step: 1,
        minValue: for_log_gpu_min,
        maxValue: for_log_gpu_max,
      },
      ram: {
        min: 1,
        max: 10240,
        step: 1,
        minValue: for_log_memory_min,
        maxValue: for_log_memory_max,
      },
      reliability: {
        min: 1,
        max: 100000,
        step: 1,
        minValue: 1,
        maxValue: for_log_reliability,
        isSingle: true,
      },
    };

    initializeRange('gpu-cnt', rangesConfiguration['gpu-cnt']);
    initializeRange('cpu-core', rangesConfiguration['cpu-core']);
    initializeRange('internet-up', rangesConfiguration['internet-up']);
    initializeRange('internet-down', rangesConfiguration['internet-down']);
    initializeRange('gpu-vram', rangesConfiguration['gpu-vram']);
    initializeRange('ram', rangesConfiguration['ram']);
    initializeRange('reliability', rangesConfiguration['reliability']);
  }

  set_init_sliders = true;

  let cerr = '';
  let c_clore_token = getCookie('clore_token');
  // await wff();
  let api_res = await call_api(
    `marketplace/servers${market_sort === 'default' ? '' : '?' + (market_sort === 'min' ? (market_currency === 'bitcoin' ? `btc_s_bottom` : `${market_currency}_s_bottom`) : market_currency === 'bitcoin' ? `btc_s_top` : `${market_currency}_s_top`)}`,
    {},
    !c_clore_token,
  ).catch(function (err) {
    enableFilters();
    cerr = err;
  });
  if (cerr) {
    // setTimeout(function () {
    //   location.reload();
    // }, 500);
  } else if (api_res['error']) {
    enableFilters();

    // setTimeout(function () {
    //   location.reload();
    // }, 500);
  } else {
    enableFilters();
    // console.log('api_res[\'disable_usd\']');
    if (api_res['disable_usd']) {
      if (getCookie('cloud-selection') === 'secure') {
        use_cloud('community', true);
        location.reload();
      } else if (getCookie('cloud-selection') === '') {
        use_cloud('community', true);
      }
    }

    let s = api_res[show_rented_servers ? 'all_servers' : 'not_rented_available_servers'],
      ms = [];
    if (api_res['my_servers']) {
      for (let x = 0; x < api_res['my_servers'].length; x++) {
        let cms = api_res['my_servers'][x];
        ms.push(cms);
      }
    }

    creation_fees = api_res['creation_fees'];
    relevant_ms = ms;
    relevant_s = s;

    handle_order_render_query(true);

    if (eff) handle_order_render_query();

    if (
      init_call &&
      (getCookie('cloud-selection') === 'secure' || location.search.includes('?secure'))
    )
      await show_no(default_images, 'secure', '');
  }
}

const render_max_instances = 30;
let glob_good_to_go = [],
  render_instances_pos = 0;

function validate_market_type(server) {
  if (market_type === 'both') {
    return true;
  } else if (market_type === 'mainline') {
    if (server['specs']) {
      return !server['specs']['stock_oc_override'];
    } else {
      return false;
    }
  } else {
    return !!server['specs']['stock_oc_override'];
  }
}

function validate_gpu_name_query(gpu_name) {
  if (market_gpu_filter.includes('any')) {
    return true;
  }

  try {
    for (let filter of market_gpu_filter) {
      if (filter.includes('opt-')) {
        let gpq = glob_gpu_types[filter.substring(4)];
        if (gpq) {
          let pn = gpu_name
            .substring(gpu_name.indexOf('x') + 2)
            .toLowerCase()
            .replace(/nvidia/g, '')
            .replace(/geforce/g, '')
            .replace(/  /, '');

          if (pn.includes(gpq['rq'])) {
            if (
              (pn.includes('super') ? gpq['rq'].includes('super') : !gpq['rq'].includes('super')) &&
              (pn.includes('laptop') ? gpq['rq'].includes('laptop') : !gpq['rq'].includes('laptop'))
            ) {
              if (gpq['ti']) {
                return true;
              } else {
                let spn = pn.split(' '),
                  efff = false;
                for (let x = 0; x < spn.length; x++) {
                  if (spn[x] === 'ti') efff = true;
                }
                if (!efff) {
                  return true;
                }
              }
            }
          }
        }
      }
    }
    return false;
  } catch (e) {
    return false;
  }
}

function validate_query(query, filterValue) {
  if (filterValue === 'any') {
    return true;
  } else {
    return filterValue.toString().toLowerCase() === query.toString().toLowerCase();
  }
}

function validate_multi_query(query, filterValues) {
  if (filterValues.includes('any')) {
    return true;
  } else {
    return filterValues.some(value =>
      value.toString().toLowerCase() === query.toString().toLowerCase()
    );
  }
}

function validate_query_plus (query, filterValue) {
  let isValid = true;

  if (filterValue !== 'any') {
    if (isNaN(query)) {
      isValid = false;
    } else {
      if (!(query >= filterValue)) {
        isValid = false;
      } else if (query < filterValue) {
        isValid = false;
      }
    }
  }

  return isValid
}

const relevant_server_info = {};

function handle_order_render_query(load_more) {
  // console.log('handle_order_render_query');
  let good_to_go = [];
  let s_html = $('#mt-servers').html();
  let c_max_render = 0;
  let fi = 0;

  if (load_more) {
    good_to_go = glob_good_to_go;
    fi = render_instances_pos;
  } else {
    glob_good_to_go = [];
    render_instances_pos = 0;
  }

  let market_cuda_f = parseInt(market_cuda.toString().split('.')[0]);
  let market_cuda_s = parseInt(market_cuda.toString().split('.')[1]);

  for (fi = fi; fi < relevant_s.length && c_max_render < render_max_instances; fi++) {
    let c_server = relevant_s[fi];

    try {
      let valid_cuda_version = true;

      if (market_cuda.toString().split('.').length === 2) {
        let cuda_f = c_server['cuda_version']
          ? parseInt(c_server['cuda_version'].split('.')[0])
          : 0;
        let cuda_s = c_server['cuda_version']
          ? parseInt(c_server['cuda_version'].split('.')[1])
          : 0;

        if (isNaN(cuda_f) || isNaN(cuda_s)) {
          valid_cuda_version = false;
        } else {
          if (!(cuda_f >= market_cuda_f)) {
            valid_cuda_version = false;
          } else if (cuda_f === market_cuda_f && cuda_s < market_cuda_s) {
            valid_cuda_version = false;
          }
        }
      }

      let vn = validate_gpu_name_query(c_server['specs']?.['gpu']);
      let v_market = validate_market_type(c_server);
      let country = validate_multi_query(c_server.specs?.net?.cc, market_country);
      const valid_pci_port = validate_query_plus(c_server.specs?.pcie_width, market_pci_port);
      const valid_pci_version = validate_query_plus(c_server.specs?.pcie_rev, market_pci_version);
      const valid_host = validate_host_filter(c_server.owner);
      const valid_rig = validate_rig_filter(c_server.id);

      if (
        vn &&
        v_market &&
        country &&
        valid_pci_port &&
        valid_pci_version &&
        valid_cuda_version &&
        valid_host &&
        valid_rig &&
        !relevant_ms.includes(c_server['id']) &&
        parseInt(c_server['specs']?.['gpu'].split(' ')[0]) >= relevant_min_gpu &&
        parseInt(c_server['specs']?.['gpu'].split(' ')[0]) <= relevant_max_gpu &&
        parseInt(c_server['specs']?.['cpus'].split('/')[0]) >= relevant_min_cpu_core &&
        parseInt(c_server['specs']?.['cpus'].split('/')[0]) <= relevant_max_cpu_core &&
        parseInt(c_server['specs']?.['net']?.['up']) >= relevant_min_internet_up_speed &&
        parseInt(c_server['specs']?.['net']?.['up']) <= relevant_max_internet_up_speed &&
        parseInt(c_server['specs']?.['net']?.['down']) >= relevant_min_internet_down_speed &&
        parseInt(c_server['specs']?.['net']?.['down']) <= relevant_max_internet_down_speed &&
        Math.round(c_server['specs']?.['ram']) >= relevant_min_mem &&
        Math.round(c_server['specs']?.['ram']) <= relevant_max_mem &&
        c_server['specs']?.['gpuram'] >= relevant_gpu_mem &&
        c_server['specs']?.['gpuram'] <= relevant_gpu_max_mem &&
        c_server['reliability'] >=
        (relevant_min_reliability < 0.011 ? -1 : relevant_min_reliability / 100) // c_server['allowed_coins']?.includes(market_currency) &&
      ) {
        c_max_render++;
        render_mt_server(c_server['owner'], c_server['id'], !!c_server['rented'], c_server);
        initAeroTags();
        good_to_go.push(`${c_server['owner']}-${c_server['id']}`);

        let stock_pl_str = '?';
        try {
          if (c_server['specs']['stock_pl'] && c_server['specs']['stock_pl'].length) {
            stock_pl_str = Math.min(...c_server['specs']['stock_pl']);
            if (stock_pl_str >= 1500 || stock_pl_str < 0) stock_pl_str = '?';
          }
        } catch (e) {
        }
        const pci = `${c_server['specs']['pcie_rev'] ? `${c_server['specs']['pcie_rev'].toString().substring(0, 1)}.0` : '?'} x${c_server['specs']['pcie_width'] ? `${c_server['specs']['pcie_width'].toString().substring(0, 2)}` : '?'} | ${stock_pl_str} W`;
        const reliability = parseFloat(parseFloat(c_server['reliability'] * 100).toFixed(2));
        const cpus = `${c_server['specs']?.['cpus'].split('/')[0]}c / ${c_server['specs']['cpus'].split('/')[1]}t`;
        const pds = `${parseInt(c_server['specs']['disk_speed'])}MB/s`;
        const disk = c_server['specs']['disk'].split(' ')[0];
        const diskStorage = `${parseInt(c_server['specs']['disk'].split(' ')[c_server['specs']['disk'].split(' ').length - 1])}GB`;
        let use_currency = market_currency ? market_currency : 'bitcoin';
        const price_str = `${use_currency === 'CLORE-Blockchain' ? c_server['price']?.['on_demand'][use_currency].toFixed(2) : use_currency === 'bitcoin' ? parseInt(c_server['price']?.['on_demand'][use_currency] * 10 ** 8) : (c_server['price']['on_demand'][use_currency] / 100).toFixed(2)} ${use_currency === 'CLORE-Blockchain' ? 'CLORE' : use_currency === 'bitcoin' ? `sats` : `USD`}/day`;
        const md_str =
          c_server['mrl'] === Infinity
            ? ``
            : `max duration: ${c_server['mrl'] < 24 ? `${c_server['mrl']}hours` : `${parseFloat((c_server['mrl'] / 24).toFixed(2))} days`}`;

        relevant_server_info[c_server['id']] = {
          mb: c_server['specs']['mb'],
          cpus,
          gpu: c_server['specs']['gpu'],
          vram: `${Math.round(c_server['specs']['gpuram']).toString()}GB`,
          pci,
          pds,
          cpu: c_server['specs']['cpu'].substring(0, 128),
          reliability: `${reliability.toFixed(2)}%`,
          disk,
          diskStorage,
          ram: `${Math.round(c_server['specs']['ram'])}GB`,
          location: '',
          price: {},
          backend_version: 0,
          speed_up: safe_round(c_server['specs']['net']['up'], 2),
          speed_down: safe_round(c_server['specs']['net']['down'], 2),
          cuda: c_server['cuda_version'],
          price_str,
          md_str,
        };

        try {
          if (c_server['price'] && c_server['price']) {
            relevant_server_info[c_server['id']]['price'] = c_server['price'];
          }
          if (c_server['specs']['backend_version']) {
            relevant_server_info[c_server['id']]['backend_version'] =
              c_server['specs']['backend_version'];
          }
          if (c_server['specs']['net']) {
            if (c_server['specs']['net']['cc'].length === 2)
              relevant_server_info[c_server['id']]['location'] = c_server['specs']['net']['cc'];
          }
        } catch (e) {
        }
      }
    } catch (e) {
      console.error(e);
    }
    render_instances_pos++;
  }

  let is_n_relevant = false;

  for (let fis = fi; fis < relevant_s.length && !is_n_relevant; fis++) {
    let c_server = relevant_s[fis];

    try {
      let vn = validate_gpu_name_query(c_server['specs']['gpu']);
      let v_market = validate_market_type(c_server);
      let country = validate_multi_query(c_server.specs?.net?.cc, market_country);
      const valid_pci_port = validate_query_plus(c_server.specs?.pcie_width, market_pci_port);
      const valid_pci_version = validate_query_plus(c_server.specs?.pcie_rev, market_pci_version);
      const valid_host = validate_host_filter(c_server.owner);
      const valid_rig = validate_rig_filter(c_server.id);

      if (
        vn &&
        v_market &&
        country &&
        valid_pci_port &&
        valid_pci_version &&
        valid_host &&
        valid_rig &&
        !relevant_ms.includes(c_server['id']) &&
        parseInt(c_server['specs']['gpu'].split(' ')[0]) >= relevant_min_gpu &&
        parseInt(c_server['specs']['gpu'].split(' ')[0]) <= relevant_max_gpu &&
        parseInt(c_server['specs']?.['cpus'].split('/')[0]) >= relevant_min_cpu_core &&
        parseInt(c_server['specs']?.['cpus'].split('/')[0]) <= relevant_max_cpu_core &&
        parseInt(c_server['specs']?.['net']?.['up']) >= relevant_min_internet_up_speed &&
        parseInt(c_server['specs']?.['net']?.['up']) <= relevant_max_internet_up_speed &&
        parseInt(c_server['specs']?.['net']?.['down']) >= relevant_min_internet_down_speed &&
        parseInt(c_server['specs']?.['net']?.['down']) <= relevant_max_internet_down_speed &&
        Math.round(c_server['specs']['ram']) >= relevant_min_mem &&
        Math.round(c_server['specs']['ram']) <= relevant_max_mem &&
        c_server['specs']['gpuram'] >= relevant_gpu_mem &&
        c_server['specs']['gpuram'] <= relevant_gpu_max_mem &&
        c_server['reliability'] >= relevant_min_reliability / 100 &&
        c_server['allowed_coins'].includes(market_currency)
      ) {
        is_n_relevant = true;
      }
    } catch (e) {
      console.error(e);
    }
  }

  glob_good_to_go = good_to_go;
  // TODO: LOAD MORE TO PROD
  if (fi < relevant_s.length && is_n_relevant) {
    $('.mt-lm-btn').html(`<span>Load More</span>`);
    $('.mt-load-more').css('display', 'inline-flex');
  } else {
    $('.mt-load-more').css('display', 'none');
  }

  let inhtml_s = [];

  while (s_html.includes(`id="mt-s`)) {
    let thtml = s_html.substring(s_html.indexOf(`id="mt-s`) + 9);

    if (thtml.includes('"')) {
      let spl = thtml.split('"');
      inhtml_s.push(spl[0]);
      s_html = thtml;
    } else {
      s_html = '';
    }
  }

  for (let i = 0; i < inhtml_s.length; i++) {
    let cobj = inhtml_s[i];

    if (!good_to_go.includes(cobj)) {
      try {
        document.getElementById(`mt-s-${cobj}`).remove();
      } catch (e) {
      }
    }
  }
}

function mt_load_more() {
  // TODO: LOAD MORE TO PROD
  $('.mt-lm-btn').html(`<span><i class="fa-solid fa-cog fa-spin"></i></span>`);
  setTimeout(function () {
    handle_order_render_query(true);
  }, 0);
}

function text_max_width(text, max_width, font_size, font_weight) {
  let finished = false,
    tt = '';
  for (let i = 0; i < text.length && !finished; i++) {
    tt = text.substring(0, text.length - i);
    if (tt.length !== text.length) {
      tt += '...';
    }
    //console.log(parseInt(get_text_size(tt,font_size,font_weight)["width"]) , max_width)
    /*if(!ff){
            if(parseInt(get_text_size_n(tt,font_size,font_weight)["width"]) < max_width*1.2) ff=true
        }else */
    if (parseInt(get_text_size(tt, font_size, font_weight)['width']) < max_width) {
      finished = true;
    }
  }
  return tt;
}

function wff() {
  return new Promise(async (resolve) => {
    let internal = setInterval(function () {
      if (document.fonts.check('12px IBM Plex Sans')) {
        clearInterval(internal);
        resolve(true);
      }
    }, 10);
  });
}

function minify_gpu_text(text) {
  try {
    let ts = text.split(' '),
      zt = '';
    for (let i = 2; i < ts.length; i++) zt += ` ${ts[i]}`;
    let min = `${ts[0]}${zt}`;
    return min;
  } catch (e) {
    return '?';
  }
}

let lo_oc_profiles = [],
  lo_oc_profiles_pos = 0,
  oc_gpus_glob = [],
  oc_profile_order_id = 0;

async function open_server_oc_info(server_id, order_id, currency) {
  const modalOverlocking = new AeroModal('overlocking-aero');

  $('.mt-oc-usd').css('display', currency === 'usd' ? `flex` : `none`);
  $('.mt-oc-btc').css('display', currency === 'btc' ? `flex` : `none`);
  $('.mt-oc-CLORE-Blockchain').css('display', currency === 'CLORE-Blockchain' ? `flex` : `none`);
  $('.mt-top-txt-oc').html(`<span>Machine #${server_id} OC profiles</span>`);

  let cerr = '';
  let apires = await call_api('get_server_oc_profiles', { server_id }).catch(function (err) {
    cerr = err;
  });

  if (cerr) {
  } else if (apires['error']) {
  } else {
    modalOverlocking.openModal();
    // $('.show-mt-oc').css('display', 'flex');

    if (order_id) {
      oc_profile_order_id = order_id;
      $('.oc-apply-btn-parent').css('display', 'flex');
    } else {
      $('.oc-apply-btn-parent').css('display', 'none');
    }

    let oc_gpus = [];

    lo_oc_profiles_pos = 0;
    lo_oc_profiles = apires['oc'] ? apires['oc'] : [];
    lo_oc_profiles.unshift(apires['stock_oc_override'] ? apires['stock_oc_override'] : {});

    try {
      oc_gpus = JSON.parse(apires['oc_gpus']);
    } catch (e) {
      console.error('error parsing oc_gpus');
    }

    oc_gpus_glob = oc_gpus;

    move_mt_oc_profile(0);
  }
}

function move_mt_oc_profile(move_n) {
  lo_oc_profiles_pos += move_n;

  if (lo_oc_profiles_pos < 0) lo_oc_profiles_pos = lo_oc_profiles.length - 1;
  if (lo_oc_profiles_pos > lo_oc_profiles.length - 1) lo_oc_profiles_pos = 0;

  try {
    if (lo_oc_profiles[lo_oc_profiles_pos]['id']) {
      $('.oc-p-name').html(`<span>Profile #${lo_oc_profiles[lo_oc_profiles_pos]['id']}</span>`);
    } else {
      $('.oc-p-name').html(`<span>Default</span>`);
    }
  } catch (e) {
  }

  render_oc_info_table(
    `.mt-ocp-obj`,
    'm',
    oc_gpus_glob,
    lo_oc_profiles[lo_oc_profiles_pos],
    true,
    true,
  );
}

async function apply_order_oc() {
  console.log('apply oc', oc_profile_order_id, lo_oc_profiles[lo_oc_profiles_pos]);

  let cerr = '';

  $('.mt-apply-oc').html(`<span><i class="fa-solid fa-cog fa-spin"></i></span>`);

  let apires = await call_api('set_order_oc_profile', {
    order_id: oc_profile_order_id,
    oc_profile: lo_oc_profiles[lo_oc_profiles_pos],
  }).catch(function (err) {
    cerr = err;
  });

  if (cerr) {
    $('.mt-apply-oc').html(`<span>APPLY PROFILE</span>`);
    aero_modal_alert('market-alert', {text: 'connection error'})
  } else if (apires['error'] === 'oc-not-allowed') {
    $('.mt-apply-oc').html(`<span>APPLY PROFILE</span>`);
    aero_modal_alert('market-alert', {text: 'this oc profile exists no more'})
  } else if (apires['error']) {
    $('.mt-apply-oc').html(`<span>APPLY PROFILE</span>`);
    aero_modal_alert('market-alert', {text: 'Error processing your request'})
  } else {
    location.reload();
  }
}

const pstr_l = {},
  mstr_l = {},
  gpu_name_l = {};

function safe_round(number, positions) {
  try {
    let rounded = number.toFixed(positions);
    return rounded;
  } catch (e) {
    return number;
  }
}

const cc_allowed_regex = /^[A-Z]+$/;

function get_gpu_counts(gpu_list) {
  const gpu_counts = gpu_list.reduce((acc, gpu) => {
    acc[gpu] = (acc[gpu] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(gpu_counts).map(([name, count]) => `${count}x ${name}`);
}

async function render_mt_server(host, server_id, rented, c_server) {
  // console.log('render_mt_server', c_server);

  const gpu_array = get_gpu_counts(c_server['gpu_array'])
  const isMoreThanOneGpu = gpu_array && gpu_array.length > 1;
  let show_aero_mix = true

  let use_currency = market_currency ? market_currency : 'bitcoin';
  let gpu = minify_gpu_text(c_server['specs']['gpu'].replace(/GeForce /g, '')).substring(0, 20),
    mb = c_server['specs']['mb'],
    cpu = c_server['specs']['cpu'],
    price_str = `${use_currency === 'CLORE-Blockchain' ? c_server['price']?.['on_demand'][use_currency].toFixed(2) : use_currency === 'bitcoin' ? parseInt(c_server['price']?.['on_demand'][use_currency] * 10 ** 8) : (c_server['price']['on_demand'][use_currency] / 100).toFixed(2)} ${use_currency === 'CLORE-Blockchain' ? 'CLORE' : use_currency === 'bitcoin' ? `sats` : `USD`}/day`

    const price_in_usd = use_currency === 'CLORE-Blockchain'
      ? c_server['price']?.['usd']?.['on_demand_clore']
      : c_server['price']?.['usd']?.['on_demand_btc'];
    const price_str_usd = price_in_usd && `
      <span>${price_in_usd % 1 === 0 ? price_in_usd : price_in_usd.toFixed(2)} USD/day</span>
      <span class="aero-b4">${price_str}</span>
    `;
    let md_str =
      c_server['mrl'] === Infinity
        ? ``
        : `max duration: ${c_server['mrl'] < 24 ? `${c_server['mrl']}hours` : `${parseFloat((c_server['mrl'] / 24).toFixed(2))} days`}`;
  let price_str_width, md_str_width;

  if (pstr_l[price_str.length.toString()]) {
    price_str_width = pstr_l[price_str.length.toString()];
  } else {
    price_str_width = parseInt(get_text_size(price_str, 16, 500)['width']) + 1;
    pstr_l[price_str.length.toString()] = price_str_width;
  }

  if (mstr_l[md_str.length.toString()]) {
    md_str_width = mstr_l[md_str.length.toString()];
  } else {
    md_str_width = parseInt(get_text_size(md_str, 12, 400)['width']) + 1;
    mstr_l[md_str.length.toString()] = md_str_width;
  }

  let price_md_str_l = price_str_width > md_str_width ? price_str_width : md_str_width;

  let cs = cpu
    .replace(/Intel/g, '')
    .replace(/ \(R\)/, '')
    .replace(/ \(TM\)/g, '')
    .replace(/\(\)/g, '')
    .split(' '),
    fcpu = '';

  for (let i = 0; i < cs.length; i++) {
    let c_str = cs[i];

    if (
      c_str.substring(parseInt(c_str).toString().length, c_str.length).toLowerCase() === 'th' ||
      c_str.toLowerCase() === 'gen' ||
      !c_str ||
      c_str === '()'
    ) {
    } else {
      fcpu += `${c_str}${cs.length === i + 1 ? `` : ` `}`;
    }
  }

  cpu = fcpu;

  let reliability = parseFloat(parseFloat(c_server['reliability'] * 100).toFixed(2));

  let txt_size;

  if (gpu_name_l[gpu.length.toString()]) {
    txt_size = gpu_name_l[gpu.length.toString()];
  } else {
    txt_size = get_text_size(gpu, 16, 500);

    if (parseInt(txt_size['width']) > 136) txt_size['width'] = '136px';

    gpu_name_l[gpu.length.toString()] = txt_size;
  }

  let lmargin = 140 - parseInt(txt_size['width']) + 5;
  let pds = parseInt(c_server['specs']['disk_speed']);

  if (pds < 0) pds = 0;

  if (pds > 9999) pds = 9999;

  if (c_server['specs']['ram']) c_server['specs']['ram'] = Math.round(c_server['specs']['ram']);

  let stock_pl_str = '?';

  try {
    if (c_server['specs']['stock_pl'] && c_server['specs']['stock_pl'].length) {
      stock_pl_str = Math.min(...c_server['specs']['stock_pl']);

      if (stock_pl_str >= 1500 || stock_pl_str < 0) stock_pl_str = '?';
    }
  } catch (e) {
  }

  let server_loc = '-';

  try {
    if (
      c_server['specs']['net']['cc'] &&
      c_server['specs']['net']['cc'].length > 1 &&
      c_server['specs']['net']['cc'].length < 4 &&
      cc_allowed_regex.test(c_server['specs']['net']['cc'])
    ) {
      server_loc = c_server['specs']['net']['cc'];
    }
  } catch (e) {
  }

  let oc_info_html = '', backend_version = c_server?.specs?.backend_version || 0
  const oc_unset_text = `<span class="mt-server-oc-unser-text">Unset</span>`,
        oc_question_mark = `<span class="mt-server-oc-unser-text">?</span>`
  if(show_default_clocks && Array.isArray(c_server?.specs?.stock_oc) && Array.isArray(c_server?.specs?.stock_pl)){
    if(c_server.specs.stock_pl.length == c_server.specs.stock_oc.length){
      const oc_counts = new Map();
      oc_info_html += `<div class="mt-server-oc-table">
        <table>
          <tr>
            <th>GPU</th>
            <th>Core Lock (MHz)</th>
            <th>Mem Lock (MHz)</th>
            <th>Core Offset (MHz)</th>
            <th>Mem Offset (MHz)</th>
            <th>Power Limit (W)</th>
          </tr>`

      let idx = 0
      c_server?.specs?.stock_oc.forEach(obj => {
        let stock_pl = c_server?.specs?.stock_pl[idx]
        const key = JSON.stringify({...obj, ...{pl: stock_pl}});
        if (oc_counts.has(key)) {
          oc_counts.set(key, oc_counts.get(key) + 1);
        } else {
          oc_counts.set(key, 1);
        }
        idx++
      });
      oc_counts.forEach((count, key) => {
        const stacked_oc = JSON.parse(key);
        oc_info_html += `<tr>
            <td>${count}x ${stacked_oc.model}</td>
            <td>${backend_version < 17 ? oc_question_mark : stacked_oc.core_lock || oc_unset_text}</td>
            <td>${backend_version < 17 ? oc_question_mark : stacked_oc.mem_lock || oc_unset_text}</td>
            <td>${stacked_oc.core_offset || oc_unset_text}</td>
            <td>${stacked_oc.mem_offset || oc_unset_text}</td>
            <td>${stacked_oc.pl || '?'}</td>
          </tr>`
      });
      oc_info_html += `</table></div>`
      show_aero_mix = false
    }else{
      oc_info_html = `<div class="mt-server-oc-table"><span class="mt-server-oc-failure-loading-text">Failure loading clocks</span></div>`
    }
  }else if(show_default_clocks && Array.isArray(c_server?.gpu_array) && Array.isArray(c_server?.specs?.stock_pl)){
    if(c_server.specs.stock_pl.length == c_server.gpu_array.length){
      const oc_counts = new Map();
      oc_info_html += `<div class="mt-server-oc-table">
        <table>
          <tr>
            <th>GPU</th>
            <th>Core Lock (MHz)</th>
            <th>Mem Lock (MHz)</th>
            <th>Core Offset (MHz)</th>
            <th>Mem Offset (MHz)</th>
            <th>Power Limit (W)</th>
          </tr>`

      let idx = 0
      c_server?.gpu_array.forEach(obj => {
        let stock_pl = c_server?.specs?.stock_pl[idx]
        const key = JSON.stringify({...{model: obj}, ...{pl: stock_pl}});
        if (oc_counts.has(key)) {
          oc_counts.set(key, oc_counts.get(key) + 1);
        } else {
          oc_counts.set(key, 1);
        }
        idx++
      });
      oc_counts.forEach((count, key) => {
        const stacked_oc = JSON.parse(key);
        oc_info_html += `<tr>
            <td>${count}x ${stacked_oc.model}</td>
            <td>${backend_version < 17 ? oc_question_mark : stacked_oc.core_lock || oc_unset_text}</td>
            <td>${backend_version < 17 ? oc_question_mark : stacked_oc.mem_lock || oc_unset_text}</td>
            <td>${stacked_oc.core_offset || oc_unset_text}</td>
            <td>${stacked_oc.mem_offset || oc_unset_text}</td>
            <td>${stacked_oc.pl || '?'}</td>
          </tr>`
      });
      oc_info_html += `</table></div>`
      show_aero_mix = false
    }else{
      oc_info_html = `<div class="mt-server-oc-table"><span class="mt-server-oc-failure-loading-text">Failure loading clocks</span></div>`
    }
  }

  let new_html = `
    <div class="desktop-server">
      <div class="info-wrapper">
        <div class="gpu-wrapper">
           <div class="host-s">
             <div>
                <span>host: ${host}</span>
             </div>
             <div class="server-tooltip">
               <span class="s-id" onclick="open_uptime_window(${server_id})">s: ${server_id}</span>
               <div class="server-tooltip-text"><span>By clicking this you can see uptime of this machine</span></div>
             </div>
           </div>
           <div class="gpu-model">
             <span>${isMoreThanOneGpu ? 'Mix GPU' : gpu}</span>
           </div>
           <div class="gpu-vram">
             <span>${Math.round(c_server['specs']['gpuram'])}GB VRAM</span>
             ${c_server['oc'] ?
                `<div>
                  (<span class="oc-button" onclick="open_server_oc_info(${c_server['id']},false,($('#market-currency').val()=='bitcoin' || !$('#market-currency').val())?'btc':$('#market-currency').val())">OC</span>)
                </div>` : ''
              }
           </div>
           <div class="pcie-wrapper">
             <span>
                PCIe ${c_server['specs']['pcie_rev'] ? `${c_server['specs']['pcie_rev'].toString().substring(0, 1)}.0` : '?'} x${c_server['specs']['pcie_width'] ? `${c_server['specs']['pcie_width'].toString().substring(0, 2)}` : '?'} | ${stock_pl_str} W
             </span>
           </div>
        </div>
        <div class="mb-wrapper">
          <div class="rating-wrapper">
              ${c_server['rating'] ?
                `<div>${c_server['rating']['cnt'] === 0 ? '<span class="server-rating-white">Not rated yet</span>' : `<span class="server-rating-${c_server['rating']['avg'] >= 4.5 ? `green` : c_server['rating']['avg'] >= 2.5 ? `yellow` : `orange`}">Rating: ${c_server['rating']['avg'].toFixed(2)}/5 (${c_server['rating']['cnt'] < 100 ? +c_server['rating']['cnt'] : '99+'})</span>`}
                </div>`
              : `<div>${c_server['verification'] ? (c_server['verification'] === 1 ? `<span class="server-rating-blue"><i class="fa-solid fa-circle-check"></i> Verified</span>` : c_server['verification'] === 2 ? `<span class="server-rating-green"><i class="fa-solid fa-lock"></i> Secure</span>` : `<span class="server-rating-yellow"><i class="fa-solid fa-triangle-exclamation"></i> Malfunctioning</span>`) : '<span>Unverified</span>'}
                </div>`
              }
          </div>
          <div class="mb-model">
            <span>${mb ? mb : 'N/A'}</span>
          </div>
          <div class="server-rating server-tooltip">
            <div><span>Reliability: <span class="server-rating-${reliability > 99.5 ? `green` : reliability > 97 ? `yellow` : `orange`}">${reliability.toFixed(2)}%</span></span></div>
            <div class="server-tooltip-text"><span>Uptime in last 14 days</span></div>
          </div>
          <div class="cpu-model">
            <span>${cpu}</span>
          </div>
        </div>
        <div class="up-speed-wrapper">
          <div class="server-speed-up">
            <div class="speed-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M13 6.581L8 3M3 6.581L8 3M8 3L8 14" stroke="white" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <div>
              <span class="server-speed">${safe_round(c_server['specs']['net']['up'], 2)}</span>
              <span class="server-speed-param">Mbps</span>
            </div>
          </div>
            <div class="cr-cpu">
              ${c_server['specs']?.['cpus'].split('/')[0]} <span>c</span><div class="cpu-slash">/</div>${c_server['specs']['cpus'].split('/')[1]} <span>t</span>
            </div>
            <div class="ram">
              <span>RAM: ${c_server['specs']?.['ram'] ? (parseInt(c_server['specs']['ram']) < 10000 ? parseInt(c_server['specs']['ram']) : `?`) : `?`} GB</span>
            </div>
        </div>
        <div class="down-speed-wrapper">
          <div class="server-speed-down">
            <div class="speed-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M13 10.419L8 14M3 10.419L8 14M8 14L8 3" stroke="white" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <div>
              <span class="server-speed">${safe_round(c_server['specs']['net']['down'], 2)}</span>
              <span class="server-speed-param">Mbps</span>
            </div>
          </div>
          <div class="disk-wrapper">
            <span class="disk-type">Disk: ${c_server['specs']['disk'].split(' ')[0]}</span>
          </div>
          <div class="CUDA-data">
            <div class="CUDA-data-speed">
              <span>${pds} MB/s</span>
            </div>
            ${c_server['cuda_version'] ? 
              `<div class="cuda-version">
                <span>CUDA ${c_server['cuda_version']}</span>
              </div>` : ``
            }
          </div>
          <div class="region-data">
            <div class="data-storage">
              <span>${parseInt(c_server['specs']['disk'].split(' ')[c_server['specs']['disk'].split(' ').length - 1])}GB</span>
            </div>
            <div class="machine-location">
              <span>${server_loc}</span>
            </div>
          </div>
        </div>
        ${isMoreThanOneGpu && show_aero_mix ? `
          <div class="gpu-list-wrapper">
            <div class="a-tags js-a-tags" data-fixed-count="3">
              <div class="a-tags__list a-tags__list--fixed">
                ${gpu_array.slice(0, 3).map((g, i) => `
                  <div class="a-tags__item fixed" title="${g}">
                    <span class="a-tags__item-truncate">${g}</span>
                  </div>`).join('')
                }
                <button class="a-tags__btn js-a-tags-btn" title="open">
                  <svg class="a-tags__icon-open" width="20" height="21" viewBox="0 0 20 21" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 8.41797L10 13.418L5 8.41797" stroke="white" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>

                  <svg class="a-tags__icon-close" width="20" height="21" viewBox="0 0 20 21" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12.582L10 7.58203L15 12.582" stroke="white" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </button>
              </div>

              <div class="a-tags__box">
                <div class="a-tags__list a-tags__list--box js-a-tags-list">
                  ${gpu_array.map((g, i) => `
                    <div class="a-tags__item dark js-a-tags-item" title="${g}">
                      ${g}
                    </div>`).join('')
                  }

                  <button class="a-tags__btn js-a-tags-btn" title="open">
                    <svg class="a-tags__icon-open" width="20" height="21" viewBox="0 0 20 21" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 8.41797L10 13.418L5 8.41797" stroke="white" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                    </svg>

                    <svg class="a-tags__icon-close" width="20" height="21" viewBox="0 0 20 21" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12.582L10 7.58203L15 12.582" stroke="white" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>` : ''
        }
      </div>
      <div class="buttons-wrapper">
        <div class="pricing_data">
          <span class="max-duration">${md_str}</span>
          <p class="sats-ppd">${show_in_usd && price_str_usd ? price_str_usd : price_str}</p>
        </div>
        <div class="rent-buttons">
            ${market_currency === 'usd' ? `` : `<div id="spot-button-${server_id}" class="aero-btn-primary server-btn${rented ? ' aero-btn-primary-disabled' : `" onclick="open_spot(${server_id})`}"><span>Spot market</span></div>`}
            <div id="rent-button-${server_id}" class="server-rent-button aero-btn-secondary server-btn${rented ? ' aero-btn-secondary-disabled' : ''} server-rent-button"
            ${rented ? '' : !selected_template 
                          ? ` onclick="show_no(default_images,'on-demand',${server_id},${host})"` 
                          : ` onclick="rent_server_by_template(${server_id})"`}><span>${rented ? 'Rented' : 'Rent'}</span></div>
        </div>
      </div>
    </div>
    <div class="mobile-server">
      <div class="m-info-wrapper">
        <div class="m-gpu-wrapper">
          <div class="host-s">
            <div>
              <span>host: ${host}</span>
            </div>
            <div class="server-tooltip">
              <span class="s-id" onclick="open_uptime_window(${server_id})">s: ${server_id}</span>
              <div class="server-tooltip-text"><span>By clicking this you can see uptime of this machine</span></div>
            </div>
          </div>
          <div class="gpu-model">
            <span>${isMoreThanOneGpu ? 'Mix GPU' : gpu}</span>
          </div>
          <div class="gpu-vram">
            <span>${Math.round(c_server['specs']['gpuram'])}GB VRAM</span>
            ${c_server['oc'] ?
            `<div>
              (<span class="oc-button" onclick="open_server_oc_info(${c_server['id']},false,($('#market-currency').val()=='bitcoin' || !$('#market-currency').val())?'btc':$('#market-currency').val())">OC</span>)
            </div>` : ''
            }
          </div>
          <div>
            <span>
              PCIe ${c_server['specs']['pcie_rev'] ? `${c_server['specs']['pcie_rev'].toString().substring(0, 1)}.0` : '?'} x${c_server['specs']['pcie_width'] ? `${c_server['specs']['pcie_width'].toString().substring(0, 2)}` : '?'} | ${stock_pl_str} W
            </span>
          </div>
        </div>
        <div class="m-rating-speed">
          <div class="rating-wrapper">
            ${c_server['rating'] ?
              `<div>${c_server['rating']['cnt'] === 0 ? '<span class="server-rating-white">Not rated yet</span>' : `<span class="server-rating-${c_server['rating']['avg'] >= 4.5 ? `green` : c_server['rating']['avg'] >= 2.5 ? `yellow` : `orange`}">Rating: ${c_server['rating']['avg'].toFixed(2)}/5 (${c_server['rating']['cnt'] < 100 ? +c_server['rating']['cnt'] : '99+'})</span>`}
              </div>`
              : `<div>${c_server['verification'] ? (c_server['verification'] === 1 ? `<span class="server-rating-blue"><i class="fa-solid fa-circle-check"></i> Verified</span>` : c_server['verification'] === 2 ? `<span class="server-rating-green"><i class="fa-solid fa-lock"></i> Secure</span>` : `<span class="server-rating-yellow"><i class="fa-solid fa-triangle-exclamation"></i> Malfunctioning</span>`) : '<span>Unverified</span>'}
                </div>`
            }
          </div>
          <div class="m-server-speed">
            <div class="m-server-speed-up">
              <div class="speed-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                  <path d="M13 6.581L8 3M3 6.581L8 3M8 3L8 14" stroke="white" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="m-server-speed-wrapper">
                <span class="server-speed">${safe_round(c_server['specs']['net']['up'], 2)}</span>
                <span class="server-speed-param">Mbps</span>
              </div>
            </div>
            <div class="m-server-speed-down">
              <div class="speed-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                  <path d="M13 10.419L8 14M3 10.419L8 14M8 14L8 3" stroke="white" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <div class="m-server-speed-wrapper">
                <span class="server-speed">${safe_round(c_server['specs']['net']['down'], 2)}</span>
                <span class="server-speed-param">Mbps</span>
              </div>
            </div>
          </div>
        </div>
        ${isMoreThanOneGpu && show_aero_mix ? `
          <div class="gpu-list-wrapper">
            <div class="a-tags js-a-tags" data-fixed-count="3">
              <div class="a-tags__list a-tags__list--fixed">
                ${gpu_array.slice(0, 3).map((g, i) => `
                  <div class="a-tags__item fixed" title="${g}">
                    <span class="a-tags__item-truncate">${g}</span>
                  </div>`).join('')
                }

                <button class="a-tags__btn js-a-tags-btn" title="open">
                  <svg class="a-tags__icon-open" width="20" height="21" viewBox="0 0 20 21" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 8.41797L10 13.418L5 8.41797" stroke="white" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>

                  <svg class="a-tags__icon-close" width="20" height="21" viewBox="0 0 20 21" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12.582L10 7.58203L15 12.582" stroke="white" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </button>
              </div>

              <div class="a-tags__box">
                <div class="a-tags__list a-tags__list--box js-a-tags-list">
                  ${gpu_array.map((g, i) => `
                    <div class="a-tags__item dark js-a-tags-item" title="${g}">
                      ${g}
                    </div>`).join('')
                  }

                  <button class="a-tags__btn js-a-tags-btn" title="open">
                    <svg class="a-tags__icon-open" width="20" height="21" viewBox="0 0 20 21" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 8.41797L10 13.418L5 8.41797" stroke="white" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                    </svg>

                    <svg class="a-tags__icon-close" width="20" height="21" viewBox="0 0 20 21" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12.582L10 7.58203L15 12.582" stroke="white" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>` : ''
        }
        <div class="m-mb-wrapper">
          <div class="mb-model">
            <span>${mb ? mb : 'N/A'}</span>
          </div>
          <div class="server-tooltip">
            <div><span>Reliability: <span class="server-rating-${reliability > 99.5 ? `green` : reliability > 97 ? `yellow` : `orange`}">${reliability.toFixed(2)}%</span></span></div>
            <div class="server-tooltip-text"><span>Uptime in last 14 days</span></div>
          </div>
          <div>
            <span>${cpu}</span>
          </div>
          <div class="m-cr-cpu">
            ${c_server['specs']?.['cpus'].split('/')[0]} <span>c</span><div class="cpu-slash">/</div>${c_server['specs']['cpus'].split('/')[1]} <span>t</span>
            </div>
          <div>
            <span>RAM: ${c_server['specs']?.['ram'] ? (parseInt(c_server['specs']['ram']) < 10000 ? parseInt(c_server['specs']['ram']) : `?`) : `?`} GB</span>
          </div>
        </div>
        <div class="m-disk-data-wrapper">
          <div class="disk-wrapper">
            <span>Disk: ${c_server['specs']['disk'].split(' ')[0]}</span>
          </div>
          <div>
            <span>${pds} MB/s</span>
          </div>
          ${c_server['cuda_version']
                ? `<div class="m-cuda-version">
                    <span>CUDA ${c_server['cuda_version']}</span>
                   </div>` 
                : ``
          }
          <div>
            <span>${parseInt(c_server['specs']['disk'].split(' ')[c_server['specs']['disk'].split(' ').length - 1])}GB</span>
          </div>
          <div >
            <span>${server_loc}</span>
          </div>
        </div>
      </div>
      <div class="m-buttons-wrapper">
        <div class="m-pricing_data">
          <span class="max-duration">${md_str}</span>
          <p class="sats-ppd">${show_in_usd && price_str_usd ? price_str_usd : price_str}</p>
        </div>
        <div class="m-rent-buttons">
            ${market_currency === 'usd' ? `` : `<div id="spot-button-${server_id}" class="aero-btn-primary server-btn${rented ? ' aero-btn-primary-disabled' : `" onclick="open_spot(${server_id})`}"><span>Spot market</span></div>`}
            <div id="rent-button-${server_id}" class="aero-btn-secondary server-btn${rented ? ' aero-btn-secondary-disabled' : ''} server-rent-button"
            ${rented ? '' : !selected_template 
                          ? ` onclick="show_no(default_images,'on-demand',${server_id},${host})"`
                          : ` onclick="rent_server_by_template(${server_id})"`}><span>${rented ? 'Rented' : 'Rent'}</span></div>
        </div>
      </div>
    </div>
    ${oc_info_html}`;

  if (document.getElementById(`mt-s-${host}-${server_id}`)) {
    $(`#mt-s-${host}-${server_id}`).html(new_html);
  } else {
    document.getElementById(`mt-servers`).innerHTML +=
      `<div class="server" id="${`mt-s-${host}-${server_id}`}">${new_html}</div>`;
  }
}

function initAeroTags() {
  const tags = document.querySelectorAll('.js-a-tags');

  tags.forEach((tag) => {
    new AeroTags(tag);
  });
}

function open_spot(id) {
  location.replace(`/marketplace/spot/${id}`);
}

const ml_gts = {};

function get_text_size_n(txt, font_size, font_weight) {
  const test = document.getElementById('fortest');
  let ttl_width = 0,
    e_ml = false,
    e_ml_f = false;
  const font_size_str = font_size.toString(),
    font_weight_str = font_weight.toString();
  try {
    if (ml_gts[font_size_str]) e_ml_f = true;
    if (ml_gts[font_size_str][font_weight_str]) e_ml = true;
  } catch (e) {
  }
  if (!e_ml_f) ml_gts[font_size_str] = {};
  if (!e_ml) ml_gts[font_size_str][font_weight_str] = {};
  for (let i = 0; i < txt.length; i++) {
    let c_letter = txt[i];
    if (ml_gts[font_size_str][font_weight_str][c_letter]) {
      ttl_width += ml_gts[font_size_str][font_weight_str][c_letter];
      //console.log(ml_gts[font_size_str][font_weight_str][c_letter]);
    } else {
      test.innerHTML = `<span style="font-weight:${font_weight};font-size:${font_size}px;">${c_letter === ' ' ? `&nbsp;` : ''}</span>`;
      test.style.fontSize = font_size;
      if (c_letter !== ' ') test.innerText = c_letter;
      let r = $('#fortest').width();
      ml_gts[font_size_str][font_weight_str][c_letter] = r;
      ttl_width += r;
    }
  }
  //console.log(ttl_width);
  /*if(font_weight){
        test.innerHTML=`<span style="font-weight:${font_weight};font-size:${font_size}px;">${txt.toString()}</span>`
    }else{
        test.innerText=txt.toString()
    }
    test.style.fontSize = font_size;*/
  let height = /*(test.clientHeight + 1)*/ 0 + 'px',
    width = /*(test.clientWidth + 1)*/ parseInt(ttl_width * 1.1 + 1) + 'px';
  return { height, width };
}

function get_text_size(txt, font_size, font_weight) {
  const test = document.getElementById('fortest');
  if (font_weight) {
    test.innerHTML = `<span style="font-weight:${font_weight};font-size:${font_size}px;">${txt.toString()}</span>`;
  } else {
    test.innerText = txt.toString();
  }
  test.style.fontSize = font_size;
  let height = test.clientHeight + 1 + 'px',
    width = test.clientWidth + 1 + 'px';
  return { height, width };
}

function open_no_img_sel() {
  $('.no-img-open-stat')
      .data('is-no-image-sel-open', true)
      .html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M3 8.5H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>`);
  $('#no-img-sel').css('display', 'initial');
}

function close_no_img_sel() {
  $('.no-img-open-stat')
      .data('is-no-image-sel-open', false)
      .html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M3 8.5H13M8 3.5L8 13.5" stroke="white" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`);
  $('#no-img-sel').css('display', 'none');
}

function open_bg_img_sel() {
  $('.bg-img-open-stat')
      .data('is-image-sel-open', true)
      .html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M3 8.5H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>`);
  $('#bg-img-sel').css('display', 'initial');
}

function close_bg_img_sel() {
  $('.bg-img-open-stat')
      .data('is-image-sel-open', false)
      .html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M3 8.5H13M8 3.5L8 13.5" stroke="white" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`);
  $('#bg-img-sel').css('display', 'none');
}

function open_oc_sel() {
  $('.s-oc-open-stat')
      .data('is-oc-profile-sel-open', true)
      .html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M3 8.5H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>`);
  $('#s-oc-profiles').css('display', 'initial');
}

function close_oc_sel() {
  $('.s-oc-open-stat')
      .data('is-oc-profile-sel-open', false)
      .html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M3 8.5H13M8 3.5L8 13.5" stroke="white" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`);
  $('#s-oc-profiles').css('display', 'none');
}

function open_oc_bg() {
  $('.s-oc-open-bg')
      .data('is-oc-profile-open', true)
      .html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M3 8.5H13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>`);
  $('#s-oc-profiles-bg').css('display', 'initial');
}

function close_oc_bg() {
  $('.s-oc-open-bg')
      .data('is-oc-profile-open', false)
      .html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M3 8.5H13M8 3.5L8 13.5" stroke="white" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`);
  $('#s-oc-profiles-bg').css('display', 'none');
}

function toggle_no_img_sel() {
  let isOpen = $('.no-img-open-stat').data('is-no-image-sel-open');

  if (isOpen) {
    close_no_img_sel();
  } else {
    open_no_img_sel();
  }
}

function toggle_bg_img_sel() {
  let isOpen = $('.bg-img-open-stat').data('is-image-sel-open');

  if (isOpen) {
    close_bg_img_sel();
  } else {
    close_oc_bg();
    open_bg_img_sel();
  }
}

function toggle_oc_profile_sel() {
  let isOpen = $('.s-oc-open-stat').data('is-oc-profile-sel-open');

  if (isOpen) {
    close_oc_sel();
  } else {
    open_oc_sel();
  }
}

function toggle_oc_profile_bg() {
  let isOpen = $('.s-oc-open-bg').data('is-oc-profile-open');

  if (isOpen) {
    close_oc_bg();
  } else {
    close_bg_img_sel();
    open_oc_bg();
  }
}

let no_img_ssh = false,
  no_img_jupyter = false;

function new_order_select_img(img_name, ssh, jupyter, ports) {
  //console.log(ports)
  try {
    $('#start-cmd-monaco').css('display', 'block');
  } catch (e) {
  }
  try {
    $('.hive-hhd').css('display', 'flex');
  } catch (e) {
  }
  if (img_name.includes(`cloreai/hiveos`)) {
    $('.hive-specific').css('display', 'flex');
    $('.hive-specific').html(`<span style="margin-right: 5px;">Simple configuration</span>
                <label class="sw3">
                    <input id="simple-hive" type="checkbox" oninput="handle_simple_hive()" checked="">
                    <span class="sl3 round"></span>
                </label><div class="flexbreak"></div>
                <div class="hive-fields">
                    <div class="hive-field">
                        <div class="no-i-txt no-jp">
                            <span id="jp-span">Rig ID:</span>
                        </div><div class="flexbreak"></div>
                        <div class="no-passw-block">
                            <input id="hive-rig-id" placeholder="Rig ID" oninput="hive_validate_rigid()">
                        </div>
                    </div><div class="flexbreak"></div>
                    <div class="hive-field">
                        <div class="no-i-txt no-jp">
                            <span id="jp-span">Rig Password:</span>
                        </div><div class="flexbreak"></div>
                        <div class="no-passw-block">
                            <input id="hive-rig-pass" placeholder="Rig Password" oninput="hive_validate_rigpass()">
                        </div>
                    </div><div class="flexbreak"></div>
                    <div class="hive-field">
                        <div class="no-i-txt no-jp">
                            <span id="jp-span">Farm hash:</span>
                        </div><div class="flexbreak"></div>
                        <div class="no-passw-block">
                            <input id="hive-farm-id" placeholder="Farm hash" oninput="hive_validate_farmhash()">
                        </div>
                    </div><div class="flexbreak"></div>
                </div>
                `);
    handle_simple_hive();
  } else {
    $('.hive-specific').css('display', 'none');
    $('.hive-specific').html(``);
  }
  if (ssh) {
    no_img_ssh = true;
    $('#no-ssh-authorization').css('display', 'initial');
  } else {
    no_img_ssh = false;
    $('#no-ssh-authorization').css('display', 'none');
  }
  if (jupyter) {
    $('#jp-span').html(
      jupyter === 'rdp' ? `Remote desktop <b>admin</b> user password:` : `Jupyter Password1:`,
    );
    no_img_jupyter = true;
    $('#no-jupyter-password').css('display', 'initial');
    randomize_psw('#jupyter-passwd', 18);
  } else {
    no_img_jupyter = false;
    $('#no-jupyter-password').css('display', 'none');
  }
  no_ports = JSON.parse(ports.replace(/'/g, `"`));
  render_no_ports();
  $('#no-selected-img').text(img_name);
  close_no_img_sel();
}

function hive_validate_rigid(v2) {
  let c = $(v2 ? '#no_v2_hive_rig_id' : '#hive-rig-id')
    .val()
    .toString(),
    final = '';
  if (c.length > 64) c = c.substring(0, 64);
  for (let i = 0; i < c.length; i++) {
    let cp = parseInt(c[i]);
    if (!isNaN(cp)) final += cp.toString();
  }
  //console.log(final,c)
  if (final !== c) $(v2 ? '#no_v2_hive_rig_id' : '#hive-rig-id').val(final);
  hive_generate_config(v2);
}

function hive_validate_rigpass(v2) {
  let c = $(v2 ? '#no_v2_hive_rig_password' : '#hive-rig-pass')
    .val()
    .toString(),
    final = '';
  if (c.length > 64) c = c.substring(0, 64);
  for (let i = 0; i < c.length; i++) {
    let cp = c[i];
    if (/^[a-zA-Z 0-9]+$/.test(cp)) final += cp.toString();
  }
  //console.log(final,c)
  if (final !== c) $(v2 ? '#no_v2_hive_rig_password' : '#hive-rig-pass').val(final);
  hive_generate_config(v2);
}

function hive_validate_farmhash(v2) {
  let c = $(v2 ? '#no_v2_hive_fh' : '#hive-farm-id')
    .val()
    .toString(),
    final = '';
  if (c.length > 64) c = c.substring(0, 64);
  for (let i = 0; i < c.length; i++) {
    let cp = c[i];
    if (/^[a-zA-Z 0-9]+$/.test(cp)) final += cp.toString();
  }
  //console.log(final,c)
  if (final !== c) $(v2 ? '#no_v2_hive_fh' : '#hive-farm-id').val(final);
  hive_generate_config(v2);
}

function handle_simple_hive() {
  if ($('#simple-hive').prop('checked')) {
    $('#start-cmd-monaco').css('display', 'none');
    $('.hive-hhd').css('display', 'none');
    $('.hive-fields').css('display', 'flex');
  } else {
    $('.hive-hhd').css('display', 'flex');
    $('#start-cmd-monaco').css('display', 'block');
    $('.hive-fields').css('display', 'none');
  }
}

let wait_hgc = false;

function w_hgc() {
  return new Promise(async (resolve) => {
    let i = setInterval(function () {
      if (!wait_hgc) {
        clearInterval(i);
        resolve();
      }
    }, 100);
  });
}

function v2_monaco_exists() {
  return new Promise(async (resolve) => {
    let i = setInterval(function () {
      if (v2_monaco) {
        clearInterval(i);
        resolve();
      }
    }, 25);
  });
}

async function hive_generate_config(v2) {
  if (wait_hgc) await w_hgc();
  let cf = `#!/bin/sh
init.sh -i ${$(v2 ? '#no_v2_hive_rig_id' : '#hive-rig-id').val()} -p ${$(v2 ? '#no_v2_hive_rig_password' : '#hive-rig-pass').val()} -u clore && firstrun -f http://api.hiveos.farm ${$(v2 ? '#no_v2_hive_fh' : '#hive-farm-id').val()}`;
  hive_init_lines = cf;
  try {
    if (v2) {
      if (!v2_monaco) {
        wait_hgc = true;
        document.getElementById('example-2').checked = true;
        render_v2_monaco();
        await v2_monaco_exists();
      }
      v2_monaco.getModel().setValue(cf);
      if (wait_hgc) {
        setTimeout(function () {
          wait_hgc = false;
        }, 20);
      }
    } else {
      no_monaco.getModel().setValue(cf);
    }
  } catch (e) {
    console.error(e);
  }
  //console.log(cf)
}

let mining_simple_mode = false,
  l_bg_img = '';

function bg_select_img(img_name) {
  console.log('III', img_name);
  if (img_name === 'cloreai/hive-use-flightsheet') {
    hive_flightsheet_selected = true;
    $('.bg-show-oc').css('display', 'none');
  } else {
    hive_flightsheet_selected = false;
    if (should_show_oc_in_background_job) $('.bg-show-oc').css('display', 'flex');
  }
  $('#bg-selected-img').text(
    img_name === 'cloreai/hive-use-flightsheet'
      ? 'HiveOS Flightsheet'
      : img_name === '€'
        ? `Clore Auto Mining`
        : img_name,
  );
  $('.clore-mining-overview').css('display', img_name === '€' ? 'flex' : 'none');
  if (img_name === '€') {
    console.log('yay');
    $('#bg-monaco').css('display', 'none');
    $('.ss-span').css('display', 'none');
    $('.clore_mining_ss').css('display', 'none');
    $('.mining_simple_config').css('display', 'none');
    $('.hive-oc-info').css('display', 'none');
  } else if (img_name === 'cloreai/mining' || img_name.includes('cloreai/dynexsolve')) {
    $('.clore_mining_ss').css('display', 'flex');
    mining_simple_mode = true;
    l_bg_img = img_name;
    handle_clore_mining_sw();
    $('.hive-oc-info').css('display', 'none');
  } else if (img_name === 'cloreai/hive-use-flightsheet') {
    $('.ss-span').css('display', 'none');
    $('#bg-monaco').css('display', 'none');
    $('.clore_mining_ss').css('display', 'none');
    $('.mining_simple_config').css('display', 'none');
    $('.hive-oc-info').css('display', 'flex');
  } else {
    $('#bg-monaco').css('display', 'block');
    $('.ss-span').css('display', 'initial');
    $('.clore_mining_ss').css('display', 'none');
    $('.mining_simple_config').css('display', 'none');
    $('.hive-oc-info').css('display', 'none');
  }
  close_bg_img_sel();
}

function no_custom_in() {
  let custom_image = document.getElementById('no-img-custom').value.toString();
  for (let i = 1; i <= custom_image.length; i++) {
    if (!verify_docker_name(custom_image.substring(0, i), true)) {
      document.getElementById('no-img-custom').value = custom_image.substring(0, i - 1);
    }
  }
  no_img_ssh = false;
  $('#no-ssh-authorization').css('display', 'none');
  no_img_jupyter = false;
  $('#no-jupyter-password').css('display', 'none');
  $('#no-selected-img').text(document.getElementById('no-img-custom').value);
}

function bg_custom_in() {
  let custom_image = document.getElementById('bg-img-custom').value.toString();
  for (let i = 1; i <= custom_image.length; i++) {
    if (!verify_docker_name(custom_image.substring(0, i), true)) {
      document.getElementById('bg-img-custom').value = custom_image.substring(0, i - 1);
    }
  }
  $('#bg-selected-img').text(document.getElementById('bg-img-custom').value);
}

var no_ports = {};

function no_add_port() {
  let new_port = parseInt($('#no-fp-num').val());
  if (isNaN(new_port)) {
    beautiful_alert('#no-ba', `Invalid port number`);
  } else if (new_port < 1 || new_port > 65535) {
    beautiful_alert('#no-ba', `Invalid port number`);
  } else if (Object.keys(no_ports).length >= 5) {
    beautiful_alert('#no-ba', `You can forward up to 5 ports`);
  } else if ($('#no-fp-type').val() === 'tcp') {
    no_ports[new_port] = 'tcp';
    render_no_ports();
    $('#no-ba').html('');
  } else {
    let ttl_http = 0;
    for (let i = 0; i < Object.keys(no_ports).length; i++) {
      let cport = Object.keys(no_ports)[i];
      if (no_ports[cport] === 'http') ttl_http++;
    }
    if (ttl_http === 0) {
      no_ports[new_port] = 'http';
      render_no_ports();
      $('#no-ba').html('');
    } else {
      beautiful_alert('#no-ba', `You can forward only 1 HTTP port`);
    }
  }
}

function render_no_ports() {
  let fhtml = '';
  for (let i = 0; i < Object.keys(no_ports).length; i++) {
    fhtml += `<div class="no-fp-port">
    <div class="no-fp-port-num">
        <span>${Object.keys(no_ports)[i]} - ${no_ports[Object.keys(no_ports)[i]].toUpperCase()}</span>
    </div>
    <div class="no-fp-port-rm">
        <i class="fa-solid fa-trash-can" onclick="delete no_ports['${Object.keys(no_ports)[i]}'];render_no_ports()"></i>
    </div>
</div><div class="flexbreak"></div>`;
  }
  $('.no-fp-show').html(fhtml);
}

function randomize_psw(obj, length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  $(obj).val(result);
}

var no_pubkeys = [],
  no_monaco,
  no_g_type = '',
  no_g_renting_server = 0,
  remember_passwords = [],
  saved_dockerhub_login = '',
  allowed_feature_from_pubkeys = [],
  server_mt_obj = '',
  last_no_params = {},
  user_templates_limit = 0;

function replicate_last_show_no(replicate_param) {
  if (Object.keys(last_no_params).length === 4) {
    show_no(
      last_no_params['images'],
      last_no_params['type'],
      last_no_params['renting_server'],
      last_no_params['hosting_provider'],
      replicate_param ? replicate_param : 'default',
    );
  }
}

function render_template_button() {
  if (rent_by_template_enabled) {
    if (!selected_template) {
      $(".templates-wrapper").html(`
        <button class="templates-btn" onclick="open_templates_modal()">
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" fill="none"><path stroke="#F73737" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9.689 9.689 3.875 3.875m-3.875 7.75 3.875-3.875m3.875 0 3.875 3.875m0-11.625-3.875 3.875m-7.104 9.687a2.583 2.583 0 1 0-5.167 0 2.583 2.583 0 0 0 5.167 0Zm15.5-15.5a2.583 2.583 0 1 0-5.167 0 2.583 2.583 0 0 0 5.167 0Zm-15.5 0a2.583 2.583 0 1 0-5.167 0 2.583 2.583 0 0 0 5.167 0Zm15.5 15.5a2.583 2.583 0 1 0-5.167 0 2.583 2.583 0 0 0 5.167 0Zm-7.75-7.75a2.583 2.583 0 1 0-5.167 0 2.583 2.583 0 0 0 5.167 0Z"/></svg>
            <p class="templates-btn-title">
              <span class="aero-b3">Use templates</span>
              <span class="aero-caption">Start a rent from my template</span>
            </p>
        </button>
      `)
    } else {
      $(".templates-wrapper").html(`
       <button class="templates-btn selected-templates-btn" onclick="clean_selected_template()">
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" fill="none"><path stroke="#F73737" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9.689 9.689 3.875 3.875m-3.875 7.75 3.875-3.875m3.875 0 3.875 3.875m0-11.625-3.875 3.875m-7.104 9.687a2.583 2.583 0 1 0-5.167 0 2.583 2.583 0 0 0 5.167 0Zm15.5-15.5a2.583 2.583 0 1 0-5.167 0 2.583 2.583 0 0 0 5.167 0Zm-15.5 0a2.583 2.583 0 1 0-5.167 0 2.583 2.583 0 0 0 5.167 0Zm15.5 15.5a2.583 2.583 0 1 0-5.167 0 2.583 2.583 0 0 0 5.167 0Zm-7.75-7.75a2.583 2.583 0 1 0-5.167 0 2.583 2.583 0 0 0 5.167 0Z"/></svg>
            <p class="templates-btn-title">
              <span class="aero-b3">Template selected</span>
              <span class="aero-caption">You’re using «${selected_template["name"]}» template</span>
            </p>
        </button>
      `)
    }
    update_servers_list()
  }
}

function clean_selected_template() {
  selected_template = null;
  render_template_button()
}

function select_template(index) {
  selected_template = loaded_templates[index];
  render_template_button()
  const modal_select_template = new AeroModal('select-template');
  modal_select_template.closeModal()
}

function open_templates_modal() {
  const modal_select_template = new AeroModal('select-template');
  modal_select_template.openModal()
}

async function get_templates() {
  let cerr = '';
  let api_res = await call_api(
    'pubkeys?get_templates=true',
    false,
    getCookie('clore_token') === '',
  ).catch(function (err) {
    cerr = err;
  });

  if (!cerr) {
    if (
      api_res['allowed_features'].includes('templates') &&
      api_res['user_templates'] &&
      api_res['user_templates'].length > 0
    ) {
      let templates_list = '';
      api_res['user_templates'].forEach((template, index) => {
        loaded_templates.push({
          name: template['name'],
          image: template['template']?.['image'],
          forwarding: template['template']?.['ports'],
          dockerhub_auth: template['template']?.['dockerhub_auth'],
          logo: template['icon'],
          command: template['template']?.['command'] ? template['template']?.['command'] : '',
          default_tag: '',
          preset_env: template['template']?.['env'],
          private_template: true,
          autossh_entrypoint: !!template['template']?.['autossh_entrypoint'],
        });
        
        templates_list += `<li class="templates-list-item">
          <div class="templates-info">
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" fill="none"><path stroke="#F73737" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9.689 9.689 3.875 3.875m-3.875 7.75 3.875-3.875m3.875 0 3.875 3.875m0-11.625-3.875 3.875m-7.104 9.687a2.583 2.583 0 1 0-5.167 0 2.583 2.583 0 0 0 5.167 0Zm15.5-15.5a2.583 2.583 0 1 0-5.167 0 2.583 2.583 0 0 0 5.167 0Zm-15.5 0a2.583 2.583 0 1 0-5.167 0 2.583 2.583 0 0 0 5.167 0Zm15.5 15.5a2.583 2.583 0 1 0-5.167 0 2.583 2.583 0 0 0 5.167 0Zm-7.75-7.75a2.583 2.583 0 1 0-5.167 0 2.583 2.583 0 0 0 5.167 0Z"/></svg>
            <p class="templates-btn-title">
              <span class="aero-b3">${template['name']}</span>
              <span class="aero-caption">${template['template']['image']}</span>
            </p>
          </div>
          <button class="aero-btn-primary" onclick="select_template(${index})">Use for rent</button>
        </li>`
      });

    render_template_button()
    $("#templates-list").html(templates_list)
    }
  }
}

async function show_no(images, type, renting_server, hosting_provider, replicate_param) {
  last_no_params = { images, type, renting_server, hosting_provider };
  if (hosting_provider && renting_server) {
    server_mt_obj = `mt-s-${hosting_provider}-${renting_server}`;
  } else {
    server_mt_obj = '';
  }
  no_g_type = type;
  no_g_renting_server = renting_server;
  let v3_backend = false;
  try {
    if (relevant_server_info[renting_server]) {
      if (relevant_server_info[renting_server]['backend_version'] >= 3) {
        v3_backend = true;
      }
    }
  } catch (e) {
  }
  let cerr = '';
  let api_res = await call_api(
    'pubkeys?get_templates=true',
    false,
    getCookie('clore_token') === '',
  ).catch(function (err) {
    cerr = err;
  });
  if (cerr) {
    remember_passwords = [];
  } else if (api_res['remember_passwords']) {
    remember_passwords = api_res['remember_passwords'];
  }
  if (!cerr && api_res['dockerhub_auth']) saved_dockerhub_login = api_res['dockerhub_auth'];
  if (!cerr && api_res['allowed_features'])
    allowed_feature_from_pubkeys = api_res['allowed_features'];
  //$(".no-v2-save-btn").css("display",allowed_feature_from_pubkeys.includes("templates")?"inline-flex":"none")
  let modified_images = false;
  if (
    allowed_feature_from_pubkeys.includes('templates') &&
    api_res['user_templates'] &&
    api_res['user_templates'].length > 0
  ) {
    modified_images = v3_images;
    let loaded_templates = [];
    api_res['user_templates'].forEach((template) => {
      loaded_templates.push({
        name: template['name'],
        image: template['template']['image'],
        forwarding: template['template']['ports'],
        dockerhub_auth: template['template']['dockerhub_auth'],
        logo: template['icon'],
        command: template['template']['command'] ? template['template']['command'] : '',
        default_tag: '',
        preset_env: template['template']['env'],
        private_template: true,
        autossh_entrypoint: !!template['template']['autossh_entrypoint'],
      });
    });
    modified_images['Private Templates'] = loaded_templates;
  }
  if (api_res['max_templates_by_user']) user_templates_limit = api_res['max_templates_by_user'];
  if (cerr) {
  } else if (api_res['status'] && type === 'secure') {
    mk_top_select('mt-co');
    render_images(
      modified_images ? modified_images : v3_images,
      api_res,
      (creation_fees['on_demand']['usd'] / 100).toFixed(2),
      'usd',
      1,
      'on-demand',
      -1,
    );
  } else if (api_res['status'] && v3_backend) {
    mk_top_select('mt-co');
    render_images(
      modified_images ? modified_images : v3_images,
      api_res,
      market_currency === 'usd'
        ? (creation_fees['on_demand']['usd'] / 100).toFixed(2)
        : market_currency === 'CLORE-Blockchain'
          ? creation_fees['on_demand']['CLORE-Blockchain'].toFixed(2)
          : creation_fees['on_demand']['bitcoin'].toFixed(8),
      market_currency,
      1,
      'on-demand',
      renting_server,
    );
  } else if (api_res['status']) {
    $('.no-top-ba').html('');
    let imghtml = '';
    for (let i = 0; i < images.length; i++) {
      let cimg = images[i];
      imghtml += `<div class="no-abs">
    <div class="no-img-entry"${i === 0 ? ` id="no-f-img-c"` : ``} onclick="new_order_select_img(\`${cimg['image']}\`,${!!cimg['ssh']},${cimg['jupyter'] ? `'${cimg['jupyter']}'` : false},\`${cimg['ports'] ? JSON.stringify(cimg['ports']).replace(/"/g, `'`) : '[]'}\`)">
        <span>${cimg['show_name']}</span>
    </div>
</div>`;
    }
    imghtml += `<div class="no-abs no-abs-c">
    <div class="no-img-entry">
        <input id="no-img-custom" oninput="no_custom_in()" placeholder="custom image from hub.docker.com">
    </div>
</div>`;
    $('.no-abs-parent').html(imghtml);
    if (images.length > 0) document.getElementById('no-f-img-c').click();
    console.log(imghtml);
    document.getElementById('start-cmd-monaco').innerHTML = '';
    no_pubkeys = api_res['keys'];
    if (api_res['keys'].length > 0) {
      let shtml = '<select id="no_ssh_pubkey">';
      for (let i = 0; i < api_res['keys'].length; i++) {
        let ckey = api_res['keys'][i];
        shtml += `<option value="num_${i}">${ckey.split(' ')[2]}</option>`;
      }
      shtml += `\n</select>`;
      $('#ssh-no-pubkeys').html(shtml);
    }
    handle_ssh_auth_sw();
    $(`.creation_fees`).html(
      market_currency === 'usd'
        ? `<span>creation fee: ${(creation_fees['on_demand']['usd'] / 100).toFixed(2)}$ + 1 minute of rental</span>`
        : `<span>creation fee: ${creation_fees['on_demand']['bitcoin'].toFixed(8)} <i class="fa-solid fa-bitcoin-sign"></i> + 1 minute of rental</span>`,
    );
    $('#no-configure').css('display', 'flex');
    require.config({ paths: { vs: 'monaco-editor/min/vs' } });
    require(['vs/editor/editor.main'], function () {
      monaco.editor.defineTheme('monokai', monokai_theme);
      monaco.editor.setTheme('monokai');
      no_monaco = monaco.editor.create(document.getElementById('start-cmd-monaco'), {
        value: [`#!/bin/sh`, `#HERE YOU CAN WRITE YOUR INIT SCRIPT`].join('\n'),
        language: 'shell',
        minimap: { enabled: false },
      });
    });
    if (replicate_param === 'saving') {
      $('.fullscreen-loading').css('display', 'none');
    }
  }
}

let bg_monaco = '';

function show_bg(ic, s_img, mining_allowed, kernel) {
  document.getElementById('bg-monaco').innerHTML = '';

  let imghtml = '';
  const images = JSON.parse(JSON.stringify(default_images));
  images.push({
    show_name: 'cloreai/mining',
    image: 'cloreai/mining',
    ports: {},
  });
  if (kernel && kernel.includes('hive')) {
    images.push({
      show_name: 'HiveOS Flightsheet',
      image: 'cloreai/hive-use-flightsheet',
      ports: {},
    });
  }
  if (mining_allowed)
    images.push({
      show_name: 'Clore Auto Mining',
      image: '€',
      ports: {},
    });
  if (g_c_machine_backend_version > 2) {
    images.push({
      show_name: 'cloreai/dynexsolve:0.1',
      image: 'cloreai/dynexsolve:0.1',
      ports: {},
    });
  }
  for (let i = 0; i < images.length; i++) {
    let cimg = images[i];
    if (!cimg['image'].includes('cloreai/hiveos'))
      imghtml += `<div class="no-abs">
    <div class="no-img-entry"${i === 0 ? ` id="no-f-img-c"` : ``} onclick="bg_select_img(\`${cimg['image']}\`)">
        <span>${cimg['show_name']}</span>
    </div>
</div>`;
  }
  imghtml += `<div class="no-abs no-abs-c">
    <div class="no-img-entry">
        <input id="bg-img-custom" oninput="bg_custom_in()" placeholder="custom image from hub.docker.com">
    </div>
</div>`;
  $('.bg-abs-parent').html(imghtml);
  require.config({ paths: { vs: 'monaco-editor/min/vs' } });
  require(['vs/editor/editor.main'], function () {
    monaco.editor.defineTheme('monokai', monokai_theme);
    monaco.editor.setTheme('monokai');
    bg_monaco = monaco.editor.create(document.getElementById('bg-monaco'), {
      value: '',
      language: 'shell',
      minimap: { enabled: false },
      fontSize: 16,
      fontFamily: 'TT-Firs-Neue',
      automaticLayout: true
    });
    bg_monaco.getModel().setValue(ic);
    bg_select_img(s_img);
  });
}

function handle_ssh_auth_sw() {
  if (document.getElementById('no-ssh-login-method').checked) {
    $('#ssh-password').css('display', 'none');
    if (no_pubkeys.length === 0) {
      $('#ssh-no-key').css('display', 'flex');
      $('#ssh-no-pubkeys').css('display', 'none');
    } else {
      $('#ssh-no-key').css('display', 'none');
      $('#ssh-no-pubkeys').css('display', 'flex');
    }
  } else {
    $('#ssh-no-key').css('display', 'none');
    $('#ssh-no-pubkeys').css('display', 'none');
    $('#ssh-password').css('display', 'initial');
  }
}

let no_create_working = false;

async function no_create(force) {
  if (!no_create_working && !force)
    $('.no-create').html(
      `<span><div class="no-c-loader"><i class="fa-solid fa-cog fa-spin"></i></div></span>`,
    );
  if (no_create_working && !force) return;
  let order_json = {
      currency: market_currency === 'usd' ? 'usd' : 'bitcoin',
      image: $('#no-selected-img').html(),
      renting_server: no_g_renting_server,
      type: no_g_type,
      ports: no_ports,
      command: no_monaco.getValue(),
    },
    cerr = '';
  if (
    no_img_ssh &&
    !(document.getElementById('no-ssh-login-method').checked && no_pubkeys.length === 0)
  )
    order_json[
      document.getElementById('no-ssh-login-method').checked ? 'ssh_key' : 'ssh_password'
      ] = document.getElementById('no-ssh-login-method').checked
      ? no_pubkeys[parseInt($('#no_ssh_pubkey').val().substring(4))]
      : $('#ssh-passwd').val();
  if (no_img_jupyter && $('#jupyter-passwd').val() !== '')
    order_json['jupyter_token'] = $('#jupyter-passwd').val();
  //console.log(order_json)
  let api_res = await call_api("create_order", order_json).catch(function (err) {
      cerr = err;
    }),
    n_stop = false;
  if (cerr) {
    beautiful_alert('.no-top-ba', 'Connection error');
    no_create_working = false;
  } else if (api_res['error'] === 'reached_order_limit') {
    beautiful_alert('.no-top-ba', 'You have reached your order limit');
    no_create_working = false;
  } else if (api_res['error'] === 'reached_order_limit_per_day') {
    beautiful_alert(
      '.no-top-ba',
      `You have reached your daily order limit - (${api_res['limit']} orders/day)`,
    );
    no_create_working = false;
  } else if (api_res['error'] === 'server-already-rented') {
    beautiful_alert('.no-top-ba', 'This server is already rented');
    no_create_working = false;
  } else if (api_res['error'] === 'server-dont-exist' || api_res['error'] === 'server-offline') {
    beautiful_alert('.no-top-ba', 'This server is not available');
    no_create_working = false;
  } else if (api_res['error'] === 'not_enough_balance') {
    beautiful_alert(
      '.no-top-ba',
      `<i class="fa-solid fa-sack-dollar"></i> You don't have enough balance to create order`,
    );
    no_create_working = false;
  } else if (api_res['error'] === 'wait') {
    n_stop = true;
    setTimeout(function () {
      no_create();
    }, 1000);
  } else if (api_res['error'] === 'compute-not-available') {
    $('.so-alert-txt').html(
      `<span>Not enough capacity is available in our datacenter to deploy your instance, please try again later</span>`,
    );
    // $('.show-sorder-alert').css('display', 'flex');
    showModalAlert();
  } else if (api_res['error']) {
    if (order_json.command.toString().length > 16384) {
      beautiful_alert('.no-top-ba', 'Startup script exceeded maximum length 16384 characters');
    } else {
      beautiful_alert('.no-top-ba', 'Database error');
    }
  } else {
    $('#no-configure').css('display', 'none');
    mk_top_select('mt-mo');
  }
  if (!n_stop) {
    $('.no-create').html(`<span>CREATE</span>`);
  }
  console.log('odpověď', api_res);
}

const better_sortable_orders = {};

function beautiful_hours(n) {
  if (n.toString().includes('.')) {
    return n.toFixed(2);
  } else {
    return n;
  }
}

function poh_get_fee(coin, clore_blockchain_balances, order_type) {
  //console.log(coin,clore_blockchain_balances,order_type)
  if (PoH_info['rates'][coin]) {
    const cs = PoH_info['rates'][coin];
    let category = '0';
    const cs_keys = Object.keys(cs);
    for (let i = 0; i < cs_keys.length; i++) {
      let c_key = cs_keys[i];
      if (
        clore_blockchain_balances >= parseInt(c_key) &&
        clore_blockchain_balances >= parseInt(category)
      )
        category = c_key;
    }
    if (category !== '0') {
      let c_cat = cs[category];
      if (c_cat[order_type]) {
        return c_cat[order_type];
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}

const l_b_r = 0;
/*setInterval(function resize_logs(){ // enable when using xtermjs
    if($(".show-order-logs").css("display")=="flex"){
        try{
            if(l_b_r!=$("#deployment-log-terminal").width()){
                 console.log("resize happened");
            }
            l_b_r = $("#deployment-log-terminal").width();
            //console.log(iw)
            g_deployment_term_fit_addon.fit();
        }catch(e){
            console.error(e)
        }
    }
}, 33)*/
const secure_cloud_order_status = {};

function order_open_desc(order_id, fu) {
  // close all opened orders
  const all_orders = $(".my-specific-order");

  // Убрано в рамках задачи CLORE-750
  // if (all_orders.length) {
  //   for (let i = 0; i < all_orders.length; i++) {
  //     const $order = $(all_orders[i]);
  //     const current_order = $order.find(`.order-${order_id}-desc`);

  //     if (!current_order.length) {
  //       $order.find(".order-glob-desc").html('');
  //       $order.find(".order-oa").removeAttr('style');
  //       $order.find(".order-oa").html(`
  //         <span>
  //           <svg class="down" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  //             <path d="M4 10H16M10 4L10 16" stroke="#A4A4A4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  //           </svg>
  //         </span>
  //     `);}
  //   }
  // }

  let is_ch_down = !!$(`.order-${order_id}-oa-chevron`).html().includes('down');

  if (fu) is_ch_down = true;

  $(`.order-${order_id}-oa-chevron`).html(
    `<span>${is_ch_down ?
      `<svg class="up" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 10H16" stroke="#A4A4A4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>` :
      `<svg class="down" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 10H16M10 4L10 16" stroke="#A4A4A4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`}
    </span>`,
  );

  if (is_ch_down && better_sortable_orders[order_id.toString()]) {
    // open description
    let order = better_sortable_orders[order_id.toString()];
    let tcp_html = '';
    let date = new Date(order['ct'] * 1000);

    if (order['tcp_ports']) {
      for (let i = 0; i < order['tcp_ports'].length; i++) {
        let c_forward = order['tcp_ports'][i].split(':');
        let _public = '';

        for (let x = 0; x < order['pub_cluster'].length; x++) {
          _public += `${x === 0 ? '' : `<br>`}${order['pub_cluster'][x]}:${c_forward[1]}`;
        }

        tcp_html += `
          <tr>
            <td>${c_forward[0]}</td>
            <td>TCP</td>
            <td>${_public}</td>
          </tr>`;
      }
    }

    let httpdomain = '';
    let backend3_plus = false;
    let backend6_plus = false;

      if (order['p']) httpdomain = http_endpoint_by_proxy[order['p'].toString()];
    if (order['specs']['ram']) order['specs']['ram'] = Math.round(order['specs']['ram']);

    try {
      if (order['specs']) {
        if (order['specs']['backend_version']) {
          if (order['specs']['backend_version'] >= 3) backend3_plus = true;
          if (order['specs']['backend_version'] >= 6) backend6_plus = true;
        }
      }
    } catch (e) {
    }

    if (order['secure_cloud']) {
      secure_cloud_order_status[order_id] = order['instance_status'];
    }

    let t_oc = false;

    try {
      if (order['specs']['oc']) t_oc = true;
    } catch (e) {
    }

    let order_oc_price = 0;
    let autologin_txt = '';
    let pre_url_autologin = '';

    if (Object.keys(order).includes('oc_price')) order_oc_price = order['oc_price'];
    if (order['auto_login']) autologin_txt = order['auto_login'];

    //console.log(autologin_txt)
    if (autologin_txt.includes(`@(URL)`)) {
      pre_url_autologin = autologin_txt.replace(/\(URL\)/g, '').toString();
      autologin_txt = '';
    }

    let small_screen_reset_location = '';
    let reset_btn_html = allowed_orders_features.includes('reset') && !order['paused']
        ? backend6_plus
          ? `<div class="oeb oeb-reset-u aero-btn-secondary" onclick="reset_container(${order_id})">
              <span>Reboot</span>
            </div>`
          : `<div class="oeb oeb-reset-u aero-btn-secondary aero-btn-secondary-disabled" onclick="">
              <span>Reboot</span>
            </div>`
        : '';

    if (t_oc) {
      small_screen_reset_location = 'oc';
    } else if (order['spot']) {
      small_screen_reset_location = 'spot';
    } else if (
      backend3_plus &&
      (order['secure_cloud'] || Object.keys(order).includes('mon_container'))
    ) {
      small_screen_reset_location = 'logs';
    }

    let desc_html = `
<div class="order-desc-txt">
    <div class="oi-parent">
    <span class="order-oi aero-h5"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.99902 12C6.99902 12.9889 7.29227 13.9556 7.84168 14.7779C8.39108 15.6001 9.17198 16.241 10.0856 16.6194C10.9992 16.9978 12.0046 17.0969 12.9745 16.9039C13.9444 16.711 14.8353 16.2348 15.5346 15.5355C16.2338 14.8363 16.71 13.9454 16.903 12.9755C17.0959 12.0055 16.9969 11.0002 16.6184 10.0866C16.24 9.17295 15.5991 8.39206 14.7769 7.84265C13.9546 7.29324 12.9879 7 11.999 7M6.28906 18.957C7.40426 19.8723 8.72314 20.506 10.1345 20.8048C11.5459 21.1036 13.0085 21.0588 14.3989 20.674C15.7894 20.2893 17.0669 19.5759 18.124 18.594C19.181 17.6122 19.9865 16.3906 20.4725 15.0322C20.9586 13.6739 21.111 12.2186 20.9169 10.789C20.7228 9.35947 20.1878 7.99752 19.3572 6.81797C18.5265 5.63842 17.4244 4.67585 16.1438 4.01139C14.8633 3.34693 13.4418 3.00006 11.9991 3M10.999 12C10.999 12.2652 11.1044 12.5196 11.2919 12.7071C11.4795 12.8946 11.7338 13 11.999 13C12.2642 13 12.5186 12.8946 12.7061 12.7071C12.8937 12.5196 12.999 12.2652 12.999 12C12.999 11.7348 12.8937 11.4804 12.7061 11.2929C12.5186 11.1054 12.2642 11 11.999 11C11.7338 11 11.4795 11.1054 11.2919 11.2929C11.1044 11.4804 10.999 11.7348 10.999 12Z" stroke="#F73737" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>Order info</span>
    <span class="desc-row aero-b3">Created: <span>${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()} ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}</span></span>
    <span class="desc-row aero-b3">Image: <span>${order['image']}</span></span>
    ${!order['secure_cloud'] ? `<span class="desc-row aero-b3">Order lifetime: <span><span id="order-tr-${order_id}">${(((order['order_end'] ? order['order_end'] : unix_timestamp()) - order['ct']) / 3600).toFixed(2)}</span>/${beautiful_hours(order['mrl'] / 3600)} hours</span></span>` : ``}
    ${
      order['secure_cloud']
        ? `<span class="desc-row aero-b3">Storage price: <span>${(order['currency'] === 'CLORE-Blockchain' ? order['price'] : order['price'] / 100).toFixed(4)} USD/day</span></span>
    <span class="desc-row aero-b3">Compute price: <span>${(order['gpu_price'] / 100).toFixed(4)} USD/day</span></span>`
        : `<span class="desc-row aero-b3">Price: <span>${order['currency'] === 'bitcoin' ? order['price'].toFixed(8) : (order['currency'] === 'CLORE-Blockchain' ? order['price'] : order['price'] / 100).toFixed(2)} ${order['currency'] === 'bitcoin' ? 'BTC' : order['currency'] === 'CLORE-Blockchain' ? 'CLORE' : order['currency'].toUpperCase()}/day</span></span>`
    }
    ${Object.keys(order).includes('oc_price') ? `<span class="desc-row aero-b3">OC Price: <span>${order['oc_price'].toFixed(order['currency'] === 'bitcoin' ? 8 : 2)} ${order['currency'] === 'bitcoin' ? 'BTC' : order['currency'] === 'CLORE-Blockchain' ? 'CLORE' : 'USD'}/day</span></span>` : ``}
    ${
      !order['expired'] && PoH_info.active && PoH_info['balance']
        ? `
    <span class="tooltipx sttx">

    <span class="desc-row aero-b3">Discount: <span>-${order['secure_cloud'] ? `${poh_get_fee(order['currency'], PoH_info['balance'], order['spot'] ? 'spot' : 'on-demand').toFixed(2)}` : ((order['price'] + order_oc_price) * (poh_get_fee(order['currency'], PoH_info['balance'], order['spot'] ? 'spot' : 'on-demand') / 100)).toFixed(8)} ${order['secure_cloud'] ? `%` : order['currency'] === 'bitcoin' ? 'BTC/day' : 'USD/day'}</span></span>

    <span class="tooltiptext s_id_tt holdie_tt">Based on your current CLORE Blockchain holding</span>
                </span>`
        : ``
    }
    <span class="desc-row aero-b3">Total spend: <span>${order['currency'] === 'bitcoin' ? (order['spend'] + order['creation_fee']).toFixed(8) : ((order['spend'] + order['creation_fee']) / (order['currency'] === 'CLORE-Blockchain' ? 1 : 100)).toFixed(4)} ${order['currency'] === 'bitcoin' ? 'BTC' : order['currency'] === 'CLORE-Blockchain' ? 'CLORE' : order['currency'].toUpperCase()}</span></span>
    ${Object.keys(order).includes('mon_container') ? `<span class="desc-row aero-b3">Image status: ${img_status(order['mon_container'])}</span>` : ''}
    ${/*(Object.keys(order).includes("mon_container")) && */ order['secure_cloud'] ? `<span><i class="fa-solid fa-circle-info"></i></span> Initial secure cloud deployment can take few minutes` : ``}
    </div>
</div>
<div class="order-spec-txt">
    <div class="oi-parent">
    <span class="order-oi aero-h5"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6.657 15.9999C4.085 15.9999 2 13.9929 2 11.5169C2 9.04188 4.085 7.03488 6.657 7.03488C7.05 5.27288 8.451 3.83488 10.332 3.26188C12.212 2.68988 14.288 3.06888 15.776 4.26188C17.264 5.45188 17.938 7.26888 17.546 9.03088H18.536C20.449 9.03088 22 10.5909 22 12.5169C22 14.4439 20.449 16.0039 18.535 16.0039H6.657M12 16V21M16 16V20C16 20.2652 16.1054 20.5196 16.2929 20.7071C16.4804 20.8946 16.7348 21 17 21H21M8 16V20C8 20.2652 7.89464 20.5196 7.70711 20.7071C7.51957 20.8946 7.26522 21 7 21H3" stroke="#F73737" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>Server info</span>
    <span class="desc-row aero-b3">CPU: <span>${order['specs']['cpu'] ? order['specs']['cpu'] : `Not detected`}</span></span>
    <span class="desc-row aero-b3">RAM: <span>${order['specs']['ram'] ? (parseInt(order['specs']['ram']) < 10000 ? parseInt(order['specs']['ram']) : '?') : '?'} GB</span></span>
    <span class="desc-row aero-b3">DISK: <span>${order['specs']['disk'] ? order['specs']['disk'] : '?'}</span></span>
    <span class="desc-row aero-b3">GPU: <span>${order['specs']['gpu'] ? order['specs']['gpu'] : '?'}</span></span>
    ${order['secure_cloud'] ? '' : `<span class="desc-row aero-b3">Server ID: <span>${order['si']}</span></span>`}
    ${Object.keys(order).includes('mon_container') || order['secure_cloud'] ? `<span class="desc-row aero-b3"> Server status: ${order['online'] ? `<span><svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="4" cy="4.5" r="4" fill="#46CA93"/>
</svg>Online</span>` : `<span class="img_s_3"><svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="4" cy="4.5" r="4" fill="#F63737"/>
</svg>Offline</span>`}</span>` : ''}
    </div>
</div>
${order['expired'] ? `` : `<div class="order-ports-txt">
    ${order['paused'] ? '' : `
<span class="order-oi aero-h5"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 18C12.5304 18 13.0391 18.2107 13.4142 18.5858C13.7893 18.9609 14 19.4696 14 20C14 20.5304 13.7893 21.0391 13.4142 21.4142C13.0391 21.7893 12.5304 22 12 22C11.4696 22 10.9609 21.7893 10.5858 21.4142C10.2107 21.0391 10 20.5304 10 20C10 19.4696 10.2107 18.9609 10.5858 18.5858C10.9609 18.2107 11.4696 18 12 18ZM12 18V14M12 6C11.4696 6 10.9609 5.78929 10.5858 5.41421C10.2107 5.03914 10 4.53043 10 4C10 3.46957 10.2107 2.96086 10.5858 2.58579C10.9609 2.21071 11.4696 2 12 2C12.5304 2 13.0391 2.21071 13.4142 2.58579C13.7893 2.96086 14 3.46957 14 4C14 4.53043 13.7893 5.03914 13.4142 5.41421C13.0391 5.78929 12.5304 6 12 6ZM12 6V10M6 12C6 11.4696 5.78929 10.9609 5.41421 10.5858C5.03914 10.2107 4.53043 10 4 10C3.46957 10 2.96086 10.2107 2.58579 10.5858C2.21071 10.9609 2 11.4696 2 12C2 12.5304 2.21071 13.0391 2.58579 13.4142C2.96086 13.7893 3.46957 14 4 14C4.53043 14 5.03914 13.7893 5.41421 13.4142C5.78929 13.0391 6 12.5304 6 12ZM6 12H10M18 12C18 11.4696 18.2107 10.9609 18.5858 10.5858C18.9609 10.2107 19.4696 10 20 10C20.5304 10 21.0391 10.2107 21.4142 10.5858C21.7893 10.9609 22 11.4696 22 12C22 12.5304 21.7893 13.0391 21.4142 13.4142C21.0391 13.7893 20.5304 14 20 14C19.4696 14 18.9609 13.7893 18.5858 13.4142C18.2107 13.0391 18 12.5304 18 12ZM18 12H14M14 12C14 11.4696 13.7893 10.9609 13.4142 10.5858C13.0391 10.2107 12.5304 10 12 10M14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14M12 10C11.4696 10 10.9609 10.2107 10.5858 10.5858C10.2107 10.9609 10 11.4696 10 12M10 12C10 12.5304 10.2107 13.0391 10.5858 13.4142C10.9609 13.7893 11.4696 14 12 14M5.5 10.5L10.5 5.5M13.5 5.5L18.5 10.5M18.5 13.5L13.5 18.5M10.5 18.5L5.5 13.5" stroke="#F73737" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>Forwarded ports</span>
<table>
        <tr>
            <th>Container Port</th>
            <th>Type</th>
            <th>Public</th>
        </tr>
        ${tcp_html}${
      order['http_port']
        ? `<tr>
        <td>${order['http_port']}</td>
        <td>HTTP</td>
        <td><a class="order-http-proxy-link" href="https://${pre_url_autologin}o-${order_id}.${httpdomain}${autologin_txt}" target="_blank">https://o-${order_id}.${httpdomain}</a></td>
    </tr>`
        : ''
    }
    </table>`}
    <div class="desc-buttons">
      <div class="desc-buttons__top">
        ${
        backend3_plus && !order['paused'] && (order['secure_cloud'] || Object.keys(order).includes('mon_container'))
          ? `<div class="spot-mt-btn aero-btn-primary" onclick="show_logs(${order_id},'${order['secure_cloud'] ? `deployment` : order['mon_container'] === 2 ? `container` : `deployment`}')">
                  <span>Show logs</span>${small_screen_reset_location === 'logs' ? reset_btn_html : ''}
              </div>`
          : ''
        }
        ${
          t_oc && !order['paused']
            ? `<div class="spot-mt-btn aero-btn-primary" onclick="open_server_oc_info(${order['si']},${order_id},${order['currency'] === 'bitcoin' ? `'btc'` : `'${order['currency']}'`})">
                    <span class="afc">Overclocking<span>
                    ${small_screen_reset_location === 'oc' ? reset_btn_html : ''}
                </div>` 
            : ''
        }
        ${
            order['spot']
              ? `<a class="spot-mt-btn aero-btn-primary" href="/marketplace/spot/${order['si']}">
                  <span class="afc">Spot market<span>${small_screen_reset_location === 'spot' ? reset_btn_html : ''}
                 </a>`
              : ''
        }
      </div>
      <div class="noselect desc-buttons__bottom">
          <div class="oeb aero-btn-secondary" onclick="cancel_order(${order_id}, ${order['my_past_rating'] ? order['my_past_rating'] : 'null'})">
              <span>Cancel order</span>
          </div>
          ${
            order['secure_cloud'] && !order['paused']
              ? `<div class="oeb oeb-pi aero-btn-secondary" onclick="toggle_pause_start_instance(${order_id})">
                    <span class="sc-p-${order_id}">${order['instance_status'] === 'active' ? `Pause instance` : `Start instance`}</span>
                </div>`
              : `<div class="oeb aero-btn-secondary" onclick="create_chat(${order_id})">
                    <span>Contact owner</span>
                </div>`
          }
          ${allowed_orders_features.includes('reset') ? reset_btn_html.replace(/oeb-reset-u/g, `oeb-reset-d`) : ''}
      </div>
    </div>`
    }`
    $(`.order-${order_id}-desc`).html(desc_html);
    $(`.order-${order_id}-oa-chevron`).css('opacity', '1');
  } else {
    // close description
    $(`.order-${order_id}-oa-chevron`).removeAttr('style');
    $(`.order-${order_id}-desc`).html('');
  }
}

let last_reset_container_order = 0;

let modalRebootContainer = null;

function reset_container(order_id) {
  modalRebootContainer = new AeroModal('reboot-container-aero');
  last_reset_container_order = order_id;

  clear_beautiful_alert('.reset-container-bi');

  $('.reset-container-text').html(
    `Do you really want to restart order #${order_id}? This will interrupt any currently running tasks on the machine.`,
  );

  // $('.reset-container').css('display', 'flex');

  modalRebootContainer.openModal();
}

async function send_reset_container(order_id) {
  if (!order_id) order_id = last_reset_container_order;
  let cerr = '';
  let apires = await call_api('marketplace/reset_container', {
    order_id,
  }).catch(function (err) {
    cerr = err;
  });
  if (cerr) {
    beautiful_alert('.reset-container-bi', `Connection error`);
  } else {
    if (apires.error === 'reboot_quota_reached') {
      beautiful_alert(
        '.reset-container-bi',
        `<i class="fa-solid fa-clock"></i> You can request restart after more than 2 minutes from previous restart. Seconds remaining: ${apires.possible_in}`,
      );
    } else if (apires.error) {
      beautiful_alert('.reset-container-bi', `Backend fail: ${apires.error}`);
    } else {
      beautiful_alert(
        '.reset-container-bi',
        `<i class="fa-solid fa-check"></i> Restart request sent`,
        'success',
      );
      setTimeout(function () {
        if (modalRebootContainer) modalRebootContainer.closeModal();
        // $('.reset-container').css('display', 'none');
      }, 1250);
    }
  }
}

var show_expired_working = false,
  show_expired_state = getCookie('show_expired_state') === 'true',
  has_eo = false,
  lor = [] /*false - don't show expired | true - show expired*/,
  http_endpoint_by_proxy = {},
  g_hb = false,
  PoH_info = {},
  allowed_orders_features = [];

async function toggle_pause_start_instance(order_id) {
  if (secure_cloud_order_status[order_id]) {
    $(`.sc-p-${order_id}`).html(`<i class="fa-solid fa-cog fa-spin"></i>`);
    let new_state = secure_cloud_order_status[order_id] === 'active' ? 'paused' : 'active',
      cerr = '';
    let apires = await call_api('marketplace/change_secure_cloud_order_state', {
      order_id,
      new_state,
    }).catch(function (err) {
      cerr = err;
    });
    if (cerr) {
      location.reload();
    } else if (apires.status) {
      $(`.sc-p-${order_id}`).html(
        `${new_state === 'active' ? `<i class="fa-solid fa-pause"></i> PAUSE INSTANCE` : `<i class="fa-solid fa-play"></i> START INSTANCE`}`,
      );
      secure_cloud_order_status[order_id] = new_state;
    } else if (apires.error === 'not-enough-compute') {
      $(`.sc-p-${order_id}`).html(
        `${new_state !== 'active' ? `<i class="fa-solid fa-pause"></i> PAUSE INSTANCE` : `<i class="fa-solid fa-play"></i> START INSTANCE`}`,
      );
      $('.so-alert-txt').html(
        `<span>Currently all machines in clore.ai datacenter are rented, it isn't possible to start your instance, please try again later</span>`,
      );
      // $('.show-sorder-alert').css('display', 'flex');
      showModalAlert();
    } else {
      aero_modal_alert('market-alert', {text: 'Database error'})
      location.reload();
    }
    // console.log();
  }
}

async function show_orders(sb) {
  let cerr = '';
  let apires = await call_api('marketplace/orders', {
      rc: show_expired_state
  }).catch(function (err) {
      cerr = err;
  });
  //TODO: удалить моки
  // const apires = {
  //   error: false,
  //   PoH_active: true,
  //   PoH_balance: 100,
  //   PoH_rates: { rate1: 0.1, rate2: 0.2 },
  //   orders: [
  //     {
  //       id: 1,
  //       mon_container: 0,
  //       instance_status: 'running',
  //       expired: false,
  //       currency: 'bitcoin',
  //       order_end: null,
  //       online: true,
  //       price: 0.0001,
  //       oc_price: 0.00005,
  //       spot: true,
  //       paused: false,
  //       specs: {
  //         ram: 8192,
  //         backend_version: 3,
  //         cpu: '4 cores',
  //         disk: '50GB',
  //         gpu: 'NVIDIA GTX 1080',
  //         oc: true,
  //       },
  //       tcp_ports: ['80:8080'],
  //       pub_cluster: ['1.2.3.4'],
  //       ct: 1625097600,
  //       p: 1,
  //       secure_cloud: false,
  //       auto_login: '@(URL)',
  //       si: 456,
  //       spend: 0.0015,
  //       creation_fee: 0.0001,
  //       mrl: 7200,
  //       http_port: 80,
  //       image: 'Ubuntu 20.04',
  //       my_past_rating: 4,
  //       allowed_orders_features: ['reset'],
  //     },
  //     {
  //       id: 2,
  //       mon_container: 1,
  //       instance_status: 'paused',
  //       expired: true,
  //       currency: 'CLORE-Blockchain',
  //       order_end: null,
  //       online: true,
  //       price: 50,
  //       oc_price: 25,
  //       spot: false,
  //       paused: true,
  //       specs: {
  //         ram: 8192,
  //         backend_version: 3,
  //         cpu: '4 cores',
  //         disk: '50GB',
  //         gpu: 'NVIDIA GTX 1080',
  //         oc: true,
  //       },
  //       tcp_ports: ['80:8080'],
  //       pub_cluster: ['1.2.3.4'],
  //       ct: 1625097600,
  //       p: 1,
  //       secure_cloud: false,
  //       auto_login: '@(URL)',
  //       si: 456,
  //       spend: 0.0015,
  //       creation_fee: 0.0001,
  //       mrl: 7200,
  //       http_port: 80,
  //       image: 'Ubuntu 20.04',
  //       my_past_rating: 4,
  //       allowed_orders_features: ['reset'],
  //     },
  //     {
  //       id: 3,
  //       mon_container: 0,
  //       instance_status: 'running',
  //       expired: false,
  //       currency: 'bitcoin',
  //       order_end: null,
  //       online: true,
  //       price: 0.0002,
  //       oc_price: 0.0001,
  //       spot: false,
  //       paused: false,
  //       specs: {
  //         ram: 8192,
  //         backend_version: 3,
  //         cpu: '4 cores',
  //         disk: '50GB',
  //         gpu: 'NVIDIA GTX 1080',
  //         oc: true,
  //       },
  //       tcp_ports: ['80:8080'],
  //       pub_cluster: ['1.2.3.4'],
  //       ct: 1625097600,
  //       p: 1,
  //       secure_cloud: false,
  //       auto_login: '@(URL)',
  //       si: 456,
  //       spend: 0.0015,
  //       creation_fee: 0.0001,
  //       mrl: 7200,
  //       http_port: 80,
  //       image: 'Ubuntu 20.04',
  //       my_past_rating: 4,
  //       allowed_orders_features: ['reset'],
  //     },
  //   ],
  //   allowed_features: ['reset'],
  //   http_endpoint_by_proxy: 'http://example.com',
  //   eo: true,
  //   ol: 32,
  // };

  if (cerr) {
    setTimeout(function () {
      location.reload();
    }, 333);
  } else if (apires['error']) {
    setTimeout(function () {
      location.reload();
    }, 1000);
  } else {
    PoH_info = {
      active: apires['PoH_active'],
      balance: apires['PoH_balance'],
      rates: apires['PoH_rates'],
    };
    show_expired_working = false;
    let orp = '',
      oids = [],
      cao = 0,
      has_building = false,
      building_ones = [],
      per_day_total_spending_btc = 0,
      per_day_total_spending_clore = 0;
    lor = apires['orders'];
    allowed_orders_features = apires['allowed_features'] ? apires['allowed_features'] : [];

    if (apires['http_endpoint_by_proxy']) http_endpoint_by_proxy = apires['http_endpoint_by_proxy'];
    if (apires['eo']) has_eo = true;

    let poh_discount_spot = poh_get_fee('bitcoin', apires['PoH_balance'], 'spot');
    let poh_discount_on_demand = poh_get_fee('bitcoin', apires['PoH_balance'], 'on-demand');
    //console.log(poh_discount_on_demand, poh_discount_spot)
    for (let i = 0; i < apires['orders'].length; i++) {
      let c_order = apires['orders'][i];
      if (Object.keys(c_order).includes('mon_container')) {
        building_ones.push(c_order['id']);
        if (c_order['instance_status']) {
          if (c_order['instance_status'] !== 'paused' && c_order['mon_container'] === 0) {
            has_building = true;
          }
        } else if (c_order['mon_container'] === 0) {
          has_building = true;
        }
      }

      if (!apires['orders'][i]['expired']) {
        cao++;

        try {
          let h_order = apires['orders'][i];
          if (
            h_order['currency'] === 'bitcoin' &&
            !Object.keys(h_order).includes('order_end') &&
            h_order['online'] &&
            h_order['price']
          ) {
            let poh_discount_percent = h_order['spot'] ? poh_discount_spot : poh_discount_on_demand;
            per_day_total_spending_btc +=
              h_order['price'] * (1 - poh_discount_percent / 100) +
              (h_order['oc_price'] ? h_order['oc_price'] : 0);
          } else if (
            h_order['currency'] === 'CLORE-Blockchain' &&
            !Object.keys(h_order).includes('order_end') &&
            h_order['online'] &&
            h_order['price']
          ) {
            let poh_discount_percent = h_order['spot'] ? poh_discount_spot : poh_discount_on_demand;
            per_day_total_spending_clore +=
              h_order['price'] * (1 - poh_discount_percent / 100) +
              (h_order['oc_price'] ? h_order['oc_price'] : 0);
          }
        } catch (e) {
          console.error(e);
        }
        oids.push(apires['orders'][i]['id']);
      }

      better_sortable_orders[apires['orders'][i]['id'].toString()] = apires['orders'][i];

      orp += `<div class="my-specific-order">
            <div class="only-top-bar noselect" onclick="order_open_desc(${apires['orders'][i]['id']})">
                <div class="server-status">
                    <img src="/assets/img/${apires['orders'][i]['expired'] ? 'red' : apires['orders'][i]['paused'] ? 'yellow' : 'green'}-dot.svg" height="16px" width="16px">
                </div>
                <div class="server-name">
                    <span>#${apires['orders'][i]['id']}${apires['orders'][i]['spot'] ? ` (spot)` : ``}</span>
                </div>
                <div class="order-oa order-${apires['orders'][i]['id']}-oa-chevron">
                    <span>
                      <svg class="down" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 10H16M10 4L10 16" stroke="#A4A4A4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </span>
                </div>
            </div>
            <div class="order-glob-desc order-${apires['orders'][i]['id']}-desc"></div>
        </div>`;
    }

    let i_html = `<div class="mt-scount-bar">
        <span>
<!--        <span class="tooltipx">-->
<!--        <i class="fa-regular fa-circle-question"></i><span class="tooltiptext tt2">Normal users can have max of 32 active orders, to increase that number, contact our support</span></span> -->
        <span class="orders-title">Active orders:</span> <span id="mt-myorder-count">${cao}/${apires['ol']}</span>
        </span>
        <span> <span class="orders-title">Total cost:</span> ${per_day_total_spending_btc && per_day_total_spending_clore ? `${per_day_total_spending_btc.toFixed(8)} BTC/day + ${per_day_total_spending_clore.toFixed(2)} CLORE/day` : per_day_total_spending_clore && !per_day_total_spending_btc ? `${per_day_total_spending_clore.toFixed(2)} CLORE/day` : `${per_day_total_spending_btc.toFixed(8)} BTC/day`}</span>
        <div class="my-orders-switch">
          <span class="orders-title">Show expired orders</span>
          <label class="sw5">
            ${show_expired_state
      ? `<input id="my-orders-switch" type="checkbox" oninput="show_expired_orders()" checked>`
      : `<input id="my-orders-switch" type="checkbox" oninput="show_expired_orders()">`}
            <span class="sl5 round"></span>
          </label>
        </div>
<!--        <div class="oi-se noselect" onclick="show_expired_orders()"><span>${show_expired_state ? 'Hide' : 'Show'} expired orders</span></div>-->
    </div>`;

    if (!sb) {
      $('#orders-render-place').html(
        (apires['orders'].length === 0
          ? `<div class="no-orders-body"><div class="my-orders-right">${i_html}<div class="mt-ms-body">
<!--    <div class="icon-wrap mt-ns-i">-->
<!--        <span mbr-icon="" class="mbr-iconfont icon54-v3-mark-server" mbr-if="showIcon"></span>-->
<!--    </div>-->
    <!--<i class="fa-solid fa-server"></i>-->
    <span class="mt-nos-t aero-b1">You don't have any active orders
<!--    <br><span class="osl">you can rent servers on <a href="#" onclick="mk_top_select('mt-mt')">marketplace</a><span>-->
    </span>
</div></div></div>`
          : `<div class="my-orders-right">${i_html}<div class="orders">${orp}</div></div>`),
      );
      // $('span#mt-filters').remove();
    }

    // logic for opening orders during first render
    if (sb) {
      for (let i = 0; i < oids.length; i++) {
        try {
          if (building_ones.includes(oids[i])) order_open_desc(oids[i], true);
        } catch (e) {
          console.error(e);
        }
      }
    } else {
      for (let i = 0; i < oids.length; i++) {
        order_open_desc(oids[i]);
      }
    }

    g_hb = has_building;
  }
}

// TODO: вернуть
setInterval(function () {
    try {
        if (location.hash.includes('myorders') && g_hb) {
            show_orders(true);
        }
    } catch (e) {
    }
    //check deployments
}, 3300);

async function show_expired_orders() {
  if (show_expired_working) return;

  $('.oi-se').html(`<span><i class="fa-solid fa-cog fa-spin"></i></span>`);
  show_expired_working = true;
  show_expired_state = !show_expired_state;

  setCookie('show_expired_state', show_expired_state, 7);

  try {
    if (!has_eo && lor.length === 0) {
      try {
        // $('.mt-nos-t').html(
        //   `You don't have any expired orders<br><span class="osl">you can rent servers on <a href="#" onclick="mk_top_select('mt-mt')">marketplace</a><span>`,
        // );
      } catch (e) {
        console.error('Error displaying no expired orders:', e);
      }
      $('.oi-se').html(`<span>${show_expired_state ? `Hide` : `Show`} expired orders</span>`);
    } else if (has_eo) {
      await show_orders();
    }
    else{
      await show_orders();
    }
  } catch (e) {
    console.error('Error in show_expired_orders:', e);
    $('.oi-se').html(`<span>Error loading orders. Please try again.</span>`);
  } finally {
    show_expired_working = false;
  }
}

function h_issue_cb() {
  $('.co-issue-describe').css(
    'display',
    document.getElementById('co-issue-c').checked ? 'flex' : 'none',
  );
  $('.co-btns').css(
    'margin-top',
    `${machine_rating ? 0 : document.getElementById('co-issue-c').checked ? '6' : '60'}px`,
  );
}

function validate_issue_textarea() {
  let c_val = $('#issue-textarea').val();
  if (c_val.length > 2048) {
    $('#issue-textarea').val(c_val.substring(0, 2048));
  }
}

let glob_go_cancel = 0;

function cancel_order(id, show_rating) {
  const modalCancelOrder = new AeroModal('cancel-order-aero');

  modalCancelOrder.openModal();

  document.getElementById('co-issue-c').checked = false;

  h_issue_cb();
  glob_go_cancel = id;

  $('.machine-rating')
  .html(`<div class="machine-rating-text"${show_rating === null ? '' : ` style="color:var(--aero-green);"`}>${show_rating === null ? `Rate this machine` : `You have already rated this machine`}</div>
            <div class="rate">
                <input type="radio" id="star5" name="rate" value="5" ${show_rating === 5 ? `checked` : ``}/>
                <label for="star5" title="text">5 stars</label>
                <input type="radio" id="star4" name="rate" value="4" ${show_rating === 4 ? `checked` : ``}/>
                <label for="star4" title="text">4 stars</label>
                <input type="radio" id="star3" name="rate" value="3" ${show_rating === 3 ? `checked` : ``}/>
                <label for="star3" title="text">3 stars</label>
                <input type="radio" id="star2" name="rate" value="2" ${show_rating === 2 ? `checked` : ``}/>
                <label for="star2" title="text">2 stars</label>
                <input type="radio" id="star1" name="rate" value="1" ${show_rating === 1 ? `checked` : ``}/>
                <label for="star1" title="text">1 star</label>
            </div>`);
  $('#issue-textarea').val('');
  $('.cancel-order-aero-desc').html(`<span>Do you really want to cancel order ${id}?</span>`);
  $('.cancel-order-aero-desc').css('opacity', 1);
  $('.co-issue-ch').css('opacity', 1);
  $('.co-issue-describe').css('opacity', 1);
  $('.co-btns').css('opacity', 1);
  $('.co-res-alert').html('');
}

function get_machine_rating() {
  let s1 = document.getElementById('star1'),
    s2 = document.getElementById('star2'),
    s3 = document.getElementById('star3'),
    s4 = document.getElementById('star4'),
    s5 = document.getElementById('star5');
  if (s1 && s2 && s3 && s4 && s5) {
    if (s5.checked) {
      return 5;
    } else if (s4.checked) {
      return 4;
    } else if (s3.checked) {
      return 3;
    } else if (s2.checked) {
      return 2;
    } else if (s1.checked) {
      return 1;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
}

async function send_cancel_request() {
  if (glob_go_cancel !== 0) {
    let cerr = '';
    let api_res = await call_api(
      'marketplace/cancel_order',
      document.getElementById('co-issue-c').checked
        ? {
          issue: $('#issue-textarea').val(),
          id: glob_go_cancel,
          rating: get_machine_rating(),
        }
        : { id: glob_go_cancel, rating: get_machine_rating() },
    ).catch(function (err) {
      cerr = err;
    });

    if (cerr) {
      beautiful_alert('.co-res-alert', 'Connection error');
    } else if (api_res['error']) {
      beautiful_alert('.co-res-alert', 'Connection error');
    } else {
      $('.cancel-order-aero-desc').css('opacity', 0);
      $('.co-issue-ch').css('opacity', 0);
      $('.co-issue-describe').css('opacity', 0);
      $('.co-btns').css('opacity', 0);

      beautiful_alert(
        '.co-res-alert',
        `<i class="fa-solid fa-circle-check"></i> Your order will be canceled soon`,
        'success',
      );
    }
  }
}

function toggle_st() {
  if ($('.collapse').css('display') === 'none') {
    $('.navbar-expand-lg').addClass('opened');
  } else {
    $('.navbar-expand-lg').removeClass('opened');
  }
  $('.collapse').css('display', $('.collapse').css('display') === 'none' ? 'initial' : 'none');
}

function save_marketplace_query() {
  let sjson = {
    relevant_min_gpu,
    relevant_max_gpu,
    relevant_min_cpu_core,
    relevant_max_cpu_core,
    relevant_min_internet_up_speed,
    relevant_max_internet_up_speed,
    relevant_min_internet_down_speed,
    relevant_max_internet_down_speed,
    for_log_min_internet_up_speed,
    for_log_max_internet_up_speed,
    for_log_min_internet_down_speed,
    for_log_max_internet_down_speed,
    for_log_max_cpu_core,
    for_log_min_cpu_core,
    relevant_gpu_mem,
    relevant_gpu_max_mem,
    for_log_gpu_max,
    for_log_gpu_min,
    relevant_min_mem,
    relevant_max_mem,
    for_log_memory_max,
    for_log_reliability,
    for_log_memory_min,
    relevant_min_reliability,
    show_rented_servers,
    show_default_clocks,
    market_currency,
    market_gpu_filter,
    market_cuda,
    market_sort,
    market_type,
    market_country,
    market_pci_port,
    market_pci_version,
    market_host_filter,
    market_rig_filter,
    show_in_usd
  };
  setCookie(`marketplace_query`, btoa(JSON.stringify(sjson)), 180);
}

const secure_sw_html = `<div class="cloud-switch noselect sw-secure" onclick="setCookie('cloud-selection','',0);location.reload()">
                <span>Switch Clouds</span>
            </div>`;


function changeSelectedOptions (dataId, filterData) {
  const filters = document.querySelectorAll(`[data-id=${dataId}]`)
  filters.forEach(filter => {
    const buttons = filter.querySelectorAll('button')
    buttons.forEach((button) => {
      const buttonValue = button.getAttribute('data-value');

      if (filterData.includes(buttonValue)) {
        button.classList.add('selected');
      } else {
        button.classList.remove('selected');
      }
    })
  })
}

function changeMarketCurrency(value, nowork) {
  market_currency = value;

  if (!nowork) updateMarketplaceServers();
}

function changeMarketGpu(value, nowork) {
  market_gpu_filter = value;
  changeSelectedOptions('market-gpu', market_gpu_filter)

  if (!nowork) update_servers_list();
}

function changeMarketHost() {
  market_host_filter = $(`[data-id=${market_host_filter_id}]`).val();

  update_servers_list();
}

function handleInputValidation(event) {
  if (['+', '-', 'e', 'E', '.', ','].includes(event.key)) {
    event.preventDefault();
  }
}

function handlePasteValidation(event) {
  const pasteData = (event.clipboardData || window.clipboardData).getData('text');
  const sanitizedData = pasteData.replace(/[+\-eE.,]/g, '');

  if (sanitizedData !== pasteData) {
    event.preventDefault();
    event.target.value += sanitizedData;
    event.target.dispatchEvent(new Event('input'));
  }
}

function debouncedChangeMarketHost(dataId) {
  market_host_filter_id = dataId;
  const debouncedFunction = debounce(changeMarketHost, 300);
  debouncedFunction();
}

function clearChangeMarketHost(dataId) {
  market_host_filter_id = dataId;
  market_host_filter = $(`[data-id=${dataId}]`).val("").trigger('focus');
  update_servers_list();
}

function changeMarketRig() {
  market_rig_filter = $(`[data-id=${market_rig_filter_id}]`).val();

  update_servers_list();
}

function debouncedChangeMarketRig(dataId) {
  market_rig_filter_id = dataId;
  const debouncedFunction = debounce(changeMarketRig, 300);
  debouncedFunction();
}

function clearChangeMarketRig(dataId) {
  market_rig_filter_id = dataId;
  market_rig_filter = $(`[data-id=${dataId}]`).val("").trigger('focus');
  update_servers_list();
}

function changeMarketCountry(value, nowork) {
  market_country = value
  changeSelectedOptions("market-country", market_country);

  if (!nowork) update_servers_list();
}

function changePciPort(value, nowork) {
  market_pci_port = value;

  if (!nowork) update_servers_list();
}

function changePciVersion(value, nowork) {
  market_pci_version = value;

  if (!nowork) update_servers_list();
}

function changeMarketSort(value, nowork) {
  market_sort = value;

  if (!nowork) updateMarketplaceServers();
}

function changeMarketType(value, nowork) {
  market_type = value;

  if (!nowork) updateMarketplaceServers();
}

function changeMarketCuda(value, nowork) {
  market_cuda = value;

  if (!nowork) updateMarketplaceServers();
}

async function handle_srs(id) {
  const element = document.querySelector(`[data-id="${id}"]`);

  render_instances_pos = 0;
  $('#mt-servers').html(secure_sw_html);
  show_rented_servers = element.checked;
  save_marketplace_query();
  disableFilter('filter-srs');
  disableFilter('filter-sdc');
  await call_marketplace_servers(!show_rented_servers);
}

async function handle_ooc(id) {
  const element = document.querySelector(`[data-id="${id}"]`);

  render_instances_pos = 0;
  $('#mt-servers').html(secure_sw_html);
  show_default_clocks = element.checked;
  save_marketplace_query();
  disableFilter('filter-srs');
  disableFilter('filter-sdc');
  await call_marketplace_servers(true);
}

function handle_slider_style(obj) {
  let dthis = document.getElementById(obj);
  const value = ((dthis.value - dthis.min) / (dthis.max - dthis.min)) * 100;
  dthis.style.background =
    'linear-gradient(to right, #fb0056 0%, #fb0056 ' + value + '%, #000 ' + value + '%, black 0%)';
}

async function bg_set() {
  const alertContainer = '.bg-alert-container';

  let ss = bg_monaco.getValue();
  let bimg = $('#bg-selected-img').html();

  if (bimg.includes('Clore Auto Mining')) bimg = '€';

  if (bimg === 'HiveOS Flightsheet') bimg = 'cloreai/hive-use-flightsheet';

  if (bimg === 'Select one 👇') {
    aero_alert(alertContainer, "You need to select docker image", "danger");
  } else if (ss.toString().length > bg_job_max) {
    aero_alert(alertContainer, `Maximum length of startup script is ${bg_job_max} characters`, "danger");
  } else {
    let cerr = '';
    let api_res = await call_api('set_background_job', {
      server_id: current_open_server_id,
      image: bimg.toString(),
      command: ss.toString(),
      oc_profile: $('.bg-show-oc').css('display') === 'flex' ? bg_job_oc_profile : false,
    }).catch(function (err) {
      cerr = err;
    });

    if (cerr) {
      aero_alert(alertContainer, "Connection error", "danger");
    } else if (api_res['error']) {
      aero_alert(alertContainer, "Database error", "danger");
    } else {
      aero_alert(alertContainer, "Background job updated", "success");
    }
  }
}

let av_ras = true;

async function rm_active_server() {
  if (!av_ras) return;
  av_ras = false;
  $('.si-si-del').html(`<span><i class="fa-solid fa-cog fa-spin"></i></span>`);
  let name = $('#si-cn').html(),
    cerr = '';
  let api_res = await call_api('get_my_server', { name }).catch(function (err) {
    cerr = err;
  });
  if (cerr) {
    aero_modal_alert('market-alert', {text: 'connection error'})
  } else if (api_res['error']) {
    aero_modal_alert('market-alert', {text: 'database error'})
  } else {
    console.log(api_res);
    if (api_res['info']['visibility'] === 'public') {
      //$("#rs-top-txt").html("Remove Server")
      $('#ras-body').html(
        `<p> You firstly need to disable server availability to rent</p>`,
      );
    } else if (api_res['info']['rental_status'] !== 0) {
      $('#ras-body').html(
        `<p> You can't remove server that is rented</p>`,
      );
    } else {
      $('#ras-body')
        .html(`<button class="aero-btn-primary" onclick="do_rm_active_server()">Yes, Remove it!</button>`);
    }
    const modalRemoveActiveServer = new AeroModal("remove-active-server-aero");
    modalRemoveActiveServer.openModal();
    // $('#remove-active-server').css('display', 'flex');
  }
  av_ras = true;
  $('.si-si-del').html(`<span><i class="fa-solid fa-trash-can"></i> Remove Server</span>`);
}

function reboot_server() {
  $('.so-alert-txt').html(`
    <span class="reboot-server-txt">
      Reboot your machine only in case of failure or some other kind of incident. Don't reboot your machine when working fine and is rented, keep in mind, that it can disrupt customers workload!
    </span>
    <button class="aero-btn-primary w100 noselect" type="button" style="margin-top:50px;" onclick="do_reboot_s()">
        <span>Reboot</span>
    </button>
  `);

  showModalAlert();
}

async function do_reboot_s() {
  let cerr = '';
  let api_res = await call_api('reboot_machine', {
    server_id: current_open_server_id,
  }).catch(function (err) {
    cerr = err;
  });
  if (cerr) {
    aero_modal_alert('market-alert', {text: 'connection error'})
  } else if (api_res['error']) {
    aero_modal_alert('market-alert', {text: 'database error'})
  } else {
    // $('.show-sorder-alert').css('display', 'none');
    hideModalAlert();
  }
}

async function do_rm_active_server() {
  let name = $('#si-cn').html(),
    cerr = '';
  await call_api('rm_my_server', { name }).catch(function (err) {
    cerr = err;
  });
  location.reload();
}

function generate_dynex_command() {
  let pool_address = $('#mining_pool').val(),
    pool_port = $('#mining_pool_port').val(),
    pool_username = $('#mining_wallet').val(),
    pool_password = $('#pool_password').val(),
    mallob = $('#mallob_endpoint').val();
  let new_cmd = `#!/bin/bash
echo "${pool_address.replace(/"/g, '')}">/pool_url.txt
echo "${pool_port.replace(/"/g, '')}">/pool_port.txt
echo "${pool_username.replace(/"/g, '')}">/pool_wallet.txt
echo "${pool_password.replace(/"/g, '')}">/pool_password.txt${
    mallob
      ? `
echo "${mallob.replace(/"/g, '')}">/mallob.txt`
      : ''
  }`;
  bg_monaco.getModel().setValue(new_cmd);
}

function handle_clore_mining_sw() {
  let simple_mode = document.getElementById('clore_mining_simple').checked;
  if (simple_mode && l_bg_img.includes('cloreai/dynexsolve')) {
    let script = bg_monaco.getValue().split('\n');
    $('#bg-monaco').css('display', 'none');
    $('.ss-span').css('display', 'none');
    $('.mining_simple_config').css('display', 'flex');
    $('.mining_simple_config').html(`
            <span class="bg-s">Pool address:</span><div class="flexbreak"></div><input type="mining_pool" id="mining_pool" class="sm-related" oninput="validate_mining_input('#mining_pool');generate_dynex_command()"><div class="flexbreak"></div>
            <span class="bg-s">Pool port:</span><div class="flexbreak"></div><input type="mining_pool_port" id="mining_pool_port" class="sm-related" oninput="validate_mining_input('#mining_pool_port');generate_dynex_command()"><div class="flexbreak"></div>
            <span class="bg-s">Username:</span><div class="flexbreak"></div><input type="mining_wallet" id="mining_wallet" class="sm-related" oninput="validate_mining_input('#mining_wallet');generate_dynex_command()"><div class="flexbreak"></div>
            <span class="bg-s">Password:</span><div class="flexbreak"></div><input type="pool_password" id="pool_password" class="sm-related" oninput="validate_mining_input('#pool_password');generate_dynex_command()"><div class="flexbreak"></div>
            <span class="bg-s">MALLOB endpoint:</span><div class="flexbreak"></div><input type="mallob_endpoint" id="mallob_endpoint" class="sm-related" oninput="validate_mining_input('#mallob_endpoint');generate_dynex_command()">
            `);
    for (let i = 0; i < script.length; i++) {
      let cline = script[i];
      if (cline.includes(' ') && cline.includes('>')) {
        let pv = cline.split(' ')[1].substring(1);
        let pv_ls = pv.lastIndexOf('"');
        if (pv_ls > 0) {
          pv = pv.substring(0, pv_ls);
        } else {
          pv = '';
        }
        if (pv && cline.includes('/pool_url.txt')) {
          $('#mining_pool').val(pv);
        } else if (pv && cline.includes('/pool_port.txt')) {
          $('#mining_pool_port').val(pv);
        } else if (pv && cline.includes('/pool_password.txt')) {
          $('#pool_password').val(pv);
        } else if (pv && cline.includes('/pool_wallet.txt')) {
          $('#mining_wallet').val(pv);
        } else if (pv && cline.includes('/mallob.txt')) {
          $('#mallob_endpoint').val(pv);
        }
      }
    }
  } else if (simple_mode && l_bg_img.includes('cloreai/mining')) {
    let script = bg_monaco.getValue().split('\n'),
      desired_line = '';
    for (let i = 0; i < script.length; i++) {
      let cline = script[i];
      let scline = cline.split(' ');
      if (scline.length > 3) {
        if (
          scline[0] === 'echo' &&
          scline[scline.length - 1] === '/miner_cmd' &&
          scline[scline.length - 2] === '>'
        ) {
          desired_line = cline.substring(5, cline.length - 13).replace(/\\"/g, `"`);
          if (desired_line[0] === '"') desired_line = desired_line.substring(1);
          if (desired_line.includes('"')) {
            desired_line = desired_line.substring(0, desired_line.lastIndexOf('"'));
          }
        }
      }
    }
    $('#bg-monaco').css('display', 'none');
    $('.ss-span').css('display', 'none');
    $('.mining_simple_config').css('display', 'flex');
    let algo_html = `<select name="algo" id="simplemining_algo" class="sm-related" onchange="generate_mining_sw_dropdown();generate_miner_command();">`;
    for (let i = 0; i < Object.keys(simple_mining.algos).length; i++) {
      algo_html += `<option value="${Object.keys(simple_mining.algos)[i]}">${Object.keys(simple_mining.algos)[i]}</option>`;
    }
    algo_html += `</select>`;
    $('.mining_simple_config')
    .html(`<span class="bg-s" >Mining algorithm:</span><div class="flexbreak"></div>${algo_html}<div class="flexbreak"></div>
<span class="bg-s">Mining software:</span><div class="flexbreak"></div><select name="algo" id="simplemining_sw" class="sm-related onchange="generate_miner_command()""></select><div class="flexbreak"></div>
<span class="bg-s">Pool address:</span><div class="flexbreak"></div><input type="mining_pool" id="mining_pool" class="sm-related" oninput="validate_mining_input('#mining_pool');generate_miner_command()"><div class="flexbreak"></div>
<span class="bg-s">Wallet address:</span><div class="flexbreak"></div><input type="mining_wallet" id="mining_wallet" class="sm-related" oninput="validate_mining_input('#mining_wallet');generate_miner_command()">`);
    generate_mining_sw_dropdown();

    if (desired_line) {
      let algo = '',
        mining_software = '',
        pool = '',
        wallet = '';
      for (let i = 0; i < Object.keys(simple_mining.miners).length; i++) {
        let cminer_name = Object.keys(simple_mining.miners)[i];
        let c_miner_usage = simple_mining.miners[cminer_name];
        //console.log(c_miner_usage,'\n',desired_line)
        let miner_loc = c_miner_usage.substring(0, c_miner_usage.split(' ')[0].length);
        if (miner_loc) {
          if (miner_loc === desired_line.substring(0, miner_loc.length)) {
            mining_software = cminer_name;
            if (mining_software === 'bzminer') {
              for (let x = 1; x < desired_line.split(' ').length; x++) {
                let cp = desired_line.split(' ')[x];
                if (cp === '-a') {
                  algo = pstr(desired_line.split(' ')[x + 1]);
                } else if (cp === '-w') {
                  wallet = pstr(desired_line.split(' ')[x + 1]);
                } else if (cp === '-p') {
                  pool = pstr(desired_line.split(' ')[x + 1]);
                }
              }
            }
          }
        }
      }
      if (algo && mining_software) {
        $('#simplemining_algo').val(algo);
        $('#simplemining_sw').val(mining_software);
        $('#mining_pool').val(pool);
        $('#mining_wallet').val(wallet);
      } else if (desired_line.includes('sleep')) {
        $('#simplemining_algo').val('Mining Disabled');
        $('#simplemining_sw').html('');
      }
    }
  } else {
    $('.mining_simple_config').css('display', 'none');
    $('#bg-monaco').css('display', 'block');
    $('.ss-span').css('display', 'initial');
  }
}

function generate_mining_sw_dropdown() {
  let calgo = $('#simplemining_algo').val();
  let miners = simple_mining.algos[calgo],
    options = '';
  for (let i = 0; i < miners.length; i++) {
    options += `<option value="${miners[i]}">${miners[i]}</option>`;
  }
  $('#simplemining_sw').html(options);
}

function generate_miner_command() {
  let miner_name = $('#simplemining_sw').val(),
    fcmd = '',
    nalgo = $('#simplemining_algo').val();
  if (nalgo === 'Mining Disabled') {
    fcmd = 'sleep 1';
  } else {
    fcmd = simple_mining.miners[miner_name]
    .replace('%algo%', $('#simplemining_algo').val())
    .replace('%wallet%', $('#mining_wallet').val())
    .replace('%pool%', $('#mining_pool').val());
  }
  bg_monaco.getModel().setValue(`#!/bin/bash
echo "${fcmd.replace(/"/g, '\\"')}" > /miner_cmd`);
  //console.log(fcmd)
}

function validate_mining_input(obj) {
  let fi = $(obj).val();
  let nf = fi.replace(/ /g, '').replace(/"/g, '');
  if (fi.length !== nf.length) $(obj).val(nf);
}

function pstr(itxt) {
  if (itxt.substring(0, 1) === '"') itxt = itxt.substring(1);
  if (itxt.substring(itxt.length - 1) === '"') itxt = itxt.substring(0, itxt.length - 1);
  return itxt;
}

async function open_uptime_window(machine_id) {
  $('#uptime-top-txt').html(`Server #${machine_id} uptime chart`);
  let is_ll = false;
  if (getCookie('clore_token')) {
    $('#uptime-body').html(`<div class="uptime-center uptime-loading">
    <span><i class="fa-solid fa-cog fa-spin"></i></span>
</div>`);
    is_ll = true;
  } else {
    $('#uptime-body').html(`<div class="uptime-center">
    <span><i class="fa-solid fa-user"></i> You need to be signed in to view this chart</span>
</div>`);
  }
  $('#show-machine-uptime').css('display', 'flex');
  if (is_ll) {
    let cerr = '';
    let apires = await call_api('get_uptime_chart', { id: machine_id }).catch(function (err) {
      cerr = err;
    });
    if (cerr) {
      $('#uptime-body').html(`<div class="uptime-center">
    <span><i class="fa-solid fa-triangle-exclamation" style="color: #ffcc32;"></i> Connection failure</span>
</div>`);
    } else if (apires['grafana']) {
      // TODO: удалить для прода
      // apires['grafana'] =
      //   `https://freddy-grafana.clore.ai/d-solo/O-TeQkLIk/server-23992-income-statistics?orgId=1&panelId=4`;
      if (apires['grafana'] === 'server-error') {
        $('#uptime-body').html(`<div class="uptime-center">
    <span><i class="fa-solid fa-triangle-exclamation" style="color: #ffcc32;"></i> Database error</span>
</div>`);
      } else {
        $('#uptime-body').html(`<div class="grafana-timeframes noselect">
                <div class="grafana-time-btn" data-period="6h" onclick="set_uptime_grafana('6h')">
                    <span>6h</span>
                </div>
                <div class="grafana-time-btn active-btn" data-period="24h" onclick="set_uptime_grafana('24h')">
                    <span>24h</span>
                </div>
                <div class="grafana-time-btn 7d" data-period="7d" onclick="set_uptime_grafana('7d')">
                    <span>7d</span>
                </div>
                <div class="grafana-time-btn 14d" data-period="14d" onclick="set_uptime_grafana('14d')">
                    <span>14d</span>
                </div>
            </div><div class="flexbreak"></div><iframe id="grafana-uptime-f" src="${apires['grafana']}&from=now-24h&to=now" style="width: 100%;"></iframe>`);
      }
    } else {
      $('#uptime-body').html(`<div class="uptime-center">
    <span><i class="fa-solid fa-triangle-exclamation" style="color: #ffcc32;"></i> Database error</span>
</div>`);
    }
  }
}

let g_deployment_term,
  g_deployment_term_set = false,
  g_tmp_term,
  log_monaco_created = false,
  g_log_monaco,
  show_log_oid = 0,
  g_deployment_term_fit_addon,
  show_log_iteration = 0,
  lw_dl = '';
const terminal_js = false; // true - temrinalJS, false - xtermjs

function show_logs(order_id, type) {
  const modalShowLogs = new AeroModal('show-logs-aero', {
    closeCallback: () => close_logs(),
  });

  if (type) {
    document.getElementById('order-logs-sw').checked = type === 'container';
  }

  show_log_oid = order_id;
  lw_dl = '';

  // $('.show-order-logs').css('display', 'flex');

  modalShowLogs.openModal();

  if (!log_monaco_created) {
    log_monaco_created = true;
    require.config({ paths: { vs: 'monaco-editor/min/vs' } });
    require(['vs/editor/editor.main'], function () {
      monaco.editor.defineTheme('monokai', monokai_theme);
      monaco.editor.setTheme('monokai');
      g_log_monaco = monaco.editor.create(document.getElementById('log-monaco'), {
        value: [``].join('\n'),
        language: type === 'deployment' ? 'shell' : '',
        minimap: { enabled: false },
        readOnly: true,
        automaticLayout: true,
      });
    });
  } else {
    g_log_monaco.getModel().setValue('');
  }

  if (terminal_js) {
    if (!g_deployment_term_set) {
      g_deployment_term_set = true;
      g_deployment_term = new Terminal('deployment-log-terminal');
      g_deployment_term.setHeight('400px');
    } else {
      g_deployment_term.clear();
    }
  } else {
    if (!g_deployment_term_set) {
      g_deployment_term_set = true;
      g_deployment_term = new Terminal({
        cols: 160,
        rows: 1024,
      });
      //g_deployment_term_fit_addon = new FitAddon.FitAddon();
      //g_deployment_term.loadAddon(g_deployment_term_fit_addon)
      g_deployment_term.open(document.getElementById('deployment-log-terminal'));
      g_deployment_term.onRender(function () {
        try {
          const term_html = $('.xterm-rows').html();
          let lines = term_html.split(`</div>`),
            out_txt = '',
            tmp_o_txt = '';
          //console.log(term_html)
          for (let x = 0; x < lines.length; x++) {
            let c_line = lines[x];
            c_line = c_line
            .substring(c_line.indexOf('<span>'))
            .replace(/<span>/g, '')
            .replace(/<\/span>/g, '');
            tmp_o_txt = $(`<span>${c_line}</span>`).text() + '\n';
            if (tmp_o_txt.replace(/\n/g, '').length > 0) out_txt += tmp_o_txt;
          }
          //no_monaco.getValue()
          g_log_monaco.getModel().setValue(out_txt);
          //console.log(out_txt)
        } catch (e) {
        }
      });
    } else {
      g_deployment_term.reset();
    }
    //g_deployment_term_fit_addon.fit();
    g_deployment_term.write(``);
  }

  show_log_iteration++;

  let ws_endpoint =
    (window.location.protocol === 'http:' ? `ws` : `wss`) +
    `://` +
    window.location.host +
    `/ws/logs/` +
    getCookie('clore_token');

  logs_ws(ws_endpoint, order_id, show_log_iteration, type);
}

function close_logs() {
  show_log_iteration++;
  // $('.show-order-logs').css('display', 'none');
}

function findOverlapIndex(cache, newLogs) {
  // Reverse search for the starting index of newLogs in the cache
  for (let i = cache.length - 1; i >= 0; i--) {
    if (cache.substring(i).startsWith(newLogs)) {
      return newLogs.length;
    }
  }
  return -1;
}

function logs_ws(ws_endpoint, order_id, sl_iter, type) {
  const ws = new WebSocket(ws_endpoint);
  let is_ready = false;
  let ccnt = 0,
    to_close = false,
    init_sent = false;
  // Initialize with the current content if any
  // Example max cache size
  const checker = setInterval(function () {
    if (is_ready && ccnt > 2 && !init_sent) {
      ws.send(`order${order_id}`);
      ccnt = 0;
      init_sent = true;
    } else if (ccnt > 200) {
      ws.send('KEEPALIVE');
      ccnt = 0;
    }
    if (sl_iter !== show_log_iteration) {
      try {
        ws.close(1000);
      } catch (e) {
      }
      to_close = true;
    }
    ccnt++;
  }, 80);

  ws.onopen = function () {
  };

  ws.onmessage = function (evt) {
    const received_msg = evt.data;
    if (to_close) {
      try {
        ws.close(1000);
      } catch (e) {
      }
    } else if (received_msg === 'ready') {
      is_ready = true;
    } else {
      let not_json = false;
      try {
        let json = JSON.parse(received_msg);
        if (json['logs']['logs']) {
          let h_key = type === 'deployment' ? 'deployment' : 'container',
            cp = true;
          if (type !== 'deployment') {
            if (!Object.keys(json['logs']['logs']['container']).includes('log')) cp = false;
            monaco.editor.setModelLanguage(g_log_monaco.getModel(), '');
          } else {
            monaco.editor.setModelLanguage(g_log_monaco.getModel(), 'shell');
          }
          if (Object.keys(json['logs']['logs']).includes(h_key) && cp) {
            let deployment_log =
              type === 'deployment'
                ? json['logs']['logs']['deployment']
                : json['logs']['logs']['container']['log'];
            if (type === 'container' && json['logs']['logs']['by_order']) {
              g_log_monaco.getModel().setValue(deployment_log); // temporarly before finding better solution
            } else if (lw_dl !== deployment_log) {
              if (terminal_js) {
                //g_deployment_term.clear()
                g_deployment_term.print(deployment_log);
              } else {
                //console.log("writing tmp term", deployment_log.length)

                if (deployment_log.length > 1024 * 12 && lw_dl !== '') {
                  deployment_log = deployment_log.substring(deployment_log.length - 1024 * 12);
                }

                let last_valid_x = 0;
                Date.now();
                for (let x = 0; x <= lw_dl.length; x++) {
                  let lstr = lw_dl.substring(lw_dl.length - x);
                  if (deployment_log.indexOf(lstr) === 0) last_valid_x = x;
                }
                //console.log(Date.now()-da)

                if (lw_dl === '' || (type === 'deployment' && json['logs']['logs']['by_order'])) {
                  g_deployment_term.reset();
                  if (json['logs']['logs']['by_order']) {
                    deployment_log = deployment_log.replace(/\n/g, '\r\n');
                  }
                  g_deployment_term.write(deployment_log);
                } else {
                  g_deployment_term.write(deployment_log.substring(last_valid_x));
                }
              }

              lw_dl = deployment_log;
            }
          }
        }
        //console.log(json)
      } catch (e) {
        not_json = true;
      }
    }
  };

  ws.onclose = function () {
    if (to_close) {
      clearInterval(checker);
    } else {
      clearInterval(checker);
      setTimeout(function () {
        show_logs(order_id);
      }, 100);
    }
  };
}

function handle_order_log_slider() {
  let tmp_type = document.getElementById('order-logs-sw').checked ? 'container' : 'deployment';
  if (show_log_oid) show_logs(show_log_oid, tmp_type);
}

//no_monaco.getValue()
//no_monaco.getModel().setValue(`hello\nworld`)

//chat stuff

let cc_chat = [
  {
    side: 'left',
    timestamp: 50,
    message: `Ahoj jacobe, nějak ti nejede GPU #4`,
  },
  {
    side: 'right',
    timestamp: 60,
    message: `Provedu výměnu do 15 minut`,
  },
  {
    side: 'right',
    timestamp: 55,
    message: `Kouknu na to`,
  },
  {
    side: 'right',
    timestamp: 55,
    message: `Ahoj`,
  },
  {
    side: 'right',
    timestamp: 65,
    message: `Už to jede`,
  },
  {
    side: 'left',
    timestamp: 70,
    message: `Ano, potvrzuje gpu už jede, díky za opravu`,
  },
  {
    side: 'left',
    timestamp: 75,
    message: `Ještě něco, jinak nemohl bys mi dovýst pizzu dom`,
  },
  {
    side: 'left',
    timestamp: 77,
    message: `No víš když jsem od tebe vzal server za 1000satů/den :)`,
  },
  {
    side: 'right',
    timestamp: 79,
    message: `No to asi ne...`,
  },
];
let chat_render_latest = 0;

function render_chat(chat_obj, chat, fp) {
  //TODO удалить моки для прода
  // chat = [
  //   { timestamp: 1627919382000, side: 'left', message: 'Hello' },
  //   { timestamp: 1627919383000, side: 'right', message: 'Hi there!' },
  //   { timestamp: 1627919384000, side: 'left', message: 'How are you?' },
  //   { timestamp: 1627919385000, side: 'right', message: 'I am fine, thanks!' }
  // ];
  //TODO удалить моки для прода
  // chat = [
  //   {
  //     side: 'left',
  //     timestamp: 50,
  //     message: `Ahoj jacobe, nějak ti nejede GPU #4`,
  //   },
  //   {
  //     side: 'right',
  //     timestamp: 60,
  //     message: `Provedu výměnu do 15 minut`,
  //   },
  //   {
  //     side: 'right',
  //     timestamp: 55,
  //     message: `Kouknu na to`,
  //   },
  //   {
  //     side: 'right',
  //     timestamp: 55,
  //     message: `Ahoj`,
  //   },
  //   {
  //     side: 'right',
  //     timestamp: 65,
  //     message: `Už to jede`,
  //   },
  //   {
  //     side: 'left',
  //     timestamp: 70,
  //     message: `Ano, potvrzuje gpu už jede, díky za opravu`,
  //   },
  //   {
  //     side: 'left',
  //     timestamp: 75,
  //     message: `Ještě něco, jinak nemohl bys mi dovýst pizzu dom`,
  //   },
  //   {
  //     side: 'left',
  //     timestamp: 77,
  //     message: `No víš když jsem od tebe vzal server za 1000satů/den :)`,
  //   },
  //   {
  //     side: 'right',
  //     timestamp: 79,
  //     message: `No to asi ne...`,
  //   },
  // ];

  let c_sorted = [],
    cil = chat.length,
    chat_html = '';
  for (let i = 0; i < cil; i++) {
    let ct_lowest = Infinity,
      lowest_pos = Infinity;
    for (let x = 0; x < chat.length; x++) {
      let cchat = chat[x];
      if (cchat['timestamp'] < ct_lowest) {
        ct_lowest = cchat['timestamp'];
        lowest_pos = x;
      }
      if (cchat['timestamp'] > chat_render_latest && fp) chat_render_latest = cchat['timestamp'];
    }
    if (lowest_pos !== Infinity) {
      const time = dayjs(chat[lowest_pos]['timestamp']).format('DD.MM.YYYY HH:mm')
      c_sorted.push(chat[lowest_pos]);
      chat_html += `<div class="chat-bubble-${chat[lowest_pos]['side']}"><div class="chat-bubble">
    <span class="sender-status">${chat[lowest_pos]['side'] === 'left' ? sender_status : 'You'}</span>
    <span id="chat-msg-${c_sorted.length - 1}">

    </span>
    <span class="msg-time">
      ${time}
    </span>
</div></div><div class="flexbreak"></div>`;
      chat.splice(lowest_pos, 1);
    }
  }
  //console.log(chat_html)
  if (chat_html.split('flexbreak').length !== $('#chat-obj').html().split('flexbreak').length) {
    $('#chat-obj').html(chat_html);
    for (let i = 0; i < c_sorted.length; i++) {
      document.getElementById(`chat-msg-${i}`).innerText = c_sorted[i]['message'];
    }
    $('#chat-obj').scrollTop($('#chat-obj')[0].scrollHeight);
  }
  //console.log(c_sorted)
}

function chat_send_msg(textarea) {
  let v = false,
    cmsg = $('#chat-new-msg').val();
  if (textarea && window.event.keyCode === 13) {
    if ($('.msg-send-icon').html().includes('svg-paper-plane')) v = true;
  } else if (!textarea) {
    v = true;
  }
  if (v && cmsg) {
    $('#chat-new-msg').val('');
    $('.msg-send-icon').html(`<i class="fa-solid fa-cog fa-spin"></i>`);
    setTimeout(function () {
      $('#chat-new-msg').val('');
    }, 50);
    send_chat_msg(cmsg);
  }
}

async function create_chat(order_id) {
  let cerr = '';
  let apires = await call_api('chat/create', { order_id }).catch(function (err) {
    cerr = err;
  });
  if (cerr) {
    location.reload();
  } else {
    if (apires['status']) {
      mk_top_select('mt-ch');
      open_chat(order_id, true);
    } else {
      location.reload();
    }
  }
}

var opened_chat = 0;

async function send_chat_msg(message, foc) {
  if (foc) {
    if (opened_chat !== foc) return;
  }
  if (opened_chat === 0) return;
  let ioc = opened_chat,
    cerr;
  let apires = await call_api('chat/send_message', {
    order_id: opened_chat,
    message,
  }).catch(function (err) {
    cerr = err;
  });
  if (cerr) {
    location.reload();
  } else {
    if (apires['error']) {
      if (apires['error'] === 'rate-limit') {
        setTimeout(function () {
          send_chat_msg(message, ioc);
        }, 1300);
      }
    } else if (apires['status'] && apires['send_time']) {
      cc_chat.push({
        side: 'right',
        timestamp: apires['send_time'],
        message: message.toString(),
      });
      $('.msg-send-icon').html(`<svg class="svg-paper-plane" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <path
                      d="M9.99963 14.5L20.9996 3.5M9.99963 14.5L13.4996 21.5C13.5435 21.5957 13.6139 21.6769 13.7025 21.7338C13.7912 21.7906 13.8943 21.8209 13.9996 21.8209C14.1049 21.8209 14.208 21.7906 14.2966 21.7338C14.3853 21.6769 14.4557 21.5957 14.4996 21.5L20.9996 3.5M9.99963 14.5L2.99958 11C2.90384 10.9561 2.82271 10.8857 2.76583 10.7971C2.70895 10.7084 2.67871 10.6053 2.67871 10.5C2.67871 10.3947 2.70895 10.2916 2.76583 10.2029C2.82271 10.1143 2.90384 10.0439 2.99958 10L20.9996 3.5"
                      stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>`);
      render_chat('', JSON.parse(JSON.stringify(cc_chat)));
    }
  }
}

function chat_msg_max_size() {
  let cs = $('#chat-new-msg').val();
  if (cs.length > 3071) {
    console.log('too long');
    while (cs.length > 3071) {
      cs = cs.substring(0, cs.length - 1);
    }
    $('#chat-new-msg').val(cs);
  }
}

function open_chat(id, customer, machine) {
  $('#chat-obj').html('');
  cc_chat = [];
  $('.chat-list').css('display', 'none');
  opened_chat = id;
  chat_render_latest = 0;
  let ws_endpoint =
    (window.location.protocol === 'http:' ? `ws` : `wss`) +
    `://` +
    window.location.host +
    `/ws/chat/` +
    getCookie('clore_token');
  $('.chat-opened').css('display', 'flex');
  if (customer) {
    sender_status = 'Hosting provider';
    pull_chat_conversation(ws_endpoint, id);
    $('.chat-center-name').html(`<span>Chat with hosting provider of Order #${id}</span>`);
  } else {
    sender_status = 'Customer of your machine';
    pull_chat_conversation(ws_endpoint, id);
    $('.chat-center-name').html(`<span>Chat with customer of your machine ${machine}</span>`);
  }
}

function msg_back() {
  mk_top_select('mt-ch');
}

function pull_chat_conversation(ws_endpoint, chat) {
  const ws = new WebSocket(ws_endpoint);
  let is_ready = false;
  let ccnt = 0,
    to_close = false;
  const checker = setInterval(function () {
    if (is_ready && ccnt > 20) {
      ws.send(`${chat}_${chat_render_latest}`);
      ccnt = 0;
    }
    if (opened_chat !== chat) {
      to_close = true;
    }
    ccnt++;
  }, 80);

  ws.onopen = function () {
  };

  ws.onmessage = function (evt) {
    const received_msg = evt.data;
    if (to_close) {
      ws.close(1000);
    } else if (received_msg === 'ready') {
      ws.send(`${chat}_${chat_render_latest}`);
      is_ready = true;
    } else {
      let not_json = false;
      try {
        let json = JSON.parse(received_msg);
        for (let i = 0; i < json.length; i++) {
          let cson = json[i],
            incuded = false;
          for (let x = 0; x < cc_chat.length; x++) {
            if (JSON.stringify(cc_chat[x]) === JSON.stringify(cson)) incuded = true;
          }
          if (!incuded) cc_chat.push(json[i]);
        }
        render_chat('', JSON.parse(JSON.stringify(cc_chat)), true);
      } catch (e) {
        not_json = true;
      }
    }
  };

  ws.onclose = function () {
    if (to_close) {
      clearInterval(checker);
    } else {
      location.reload();
    }
  };
}

async function pull_chats() {
  let cerr = '';
  let apires = await call_api('chat/list', { rc: show_expired_state }).catch(function (err) {
    cerr = err;
  });
  if (!cerr) {
    if (apires['status']) {
      //TODO удалить моки для прода
      // apires["chats"] = [
      //         {
      //           id: 42,
      //           c: 1672181879,
      //           m: true,
      //           lm: 1672167554081,
      //         },
      //         {
      //           id: 69,
      //           c: 1672181879,
      //           m: true,
      //           lm: 1672167854082,
      //         },
      //         {
      //           id: 77,
      //           c: 1672181879,
      //           m: true,
      //           lm: 1672167554083,
      //         },
      //         {
      //           id: 71,
      //           c: 1672181879,
      //           m: true,
      //           lm: 1672167454082,
      //         },
      //         {
      //           id: 72,
      //           c: 1672181879,
      //           m: false,
      //           lm: 1672167454084,
      //           sn: "Test"
      //         },
      //         {
      //           id: 72,
      //           c: 1672181879,
      //           m: false,
      //           lm: 1672167454084,
      //           sn: "Test"
      //         },
      //   {
      //           id: 72,
      //           c: 1672181879,
      //           m: false,
      //           lm: 1672167454084,
      //           sn: "Test"
      //         },
      //       ];

      let lms = [],
        sorted_o = [],
        p__o = {},
        chats_html = '';
      for (let i = 0; i < apires['chats'].length; i++) {
        let c_chat = apires['chats'][i];
        lms.push(c_chat['lm']);
        if (p__o[c_chat['lm']]) {
          p__o[c_chat['lm']].push(c_chat);
        } else {
          p__o[c_chat['lm']] = [c_chat];
        }
      }
      lms.sort(function (a, b) {
        return a - b;
      });
      let ln = 0;
      for (let i = 0; i < lms.length; i++) {
        let clm = lms[i];
        if (clm !== ln) {
          for (let x = 0; x < p__o[clm].length; x++) {
            let ccc = p__o[clm][x];
            let date = new Date(ccc['lm']);
            let lmt = dayjs(date).format('HH:mm:ss | DD.MM.YYYY');
            if (ccc['m']) {
              chats_html += `<div class="chat-in-list" onclick="open_chat(${ccc['id']},true)">
              <div class="msg-wrapper">
                <div class="msg-info">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 19.9997L4.3 16.0997C1.976 12.6627 2.874 8.22772 6.4 5.72572C9.926 3.22472 14.99 3.42972 18.245 6.20572C21.5 8.98272 21.94 13.4717 19.274 16.7067C16.608 19.9417 11.659 20.9217 7.7 18.9997L3 19.9997Z" stroke="#F73737" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <p class="sender-info-wrapper">
                    <span class="aero-b2">Chat with hosting provider</span>
                    <span>Order ID #${ccc['id']}</span>
                  </p>
                </div>
                <div class="msg-date">
                  <span class="aero-caption">Last message: ${lmt}</span>
                </div>
              </div>
              <div class="msg-arrow-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                  <path d="M9.5 6.5L15.5 12.5L9.5 18.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>`;
            } else {
              chats_html += `<div class="chat-in-list" onclick="open_chat(${ccc['id']},false,\`${ccc['sn']}\`)">
                <div class="msg-wrapper">
                <div class="msg-info">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 19.9997L4.3 16.0997C1.976 12.6627 2.874 8.22772 6.4 5.72572C9.926 3.22472 14.99 3.42972 18.245 6.20572C21.5 8.98272 21.94 13.4717 19.274 16.7067C16.608 19.9417 11.659 20.9217 7.7 18.9997L3 19.9997Z" stroke="#F73737" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <p class="sender-info-wrapper">
                    <span class="aero-b2">Chat with customer of your machine ${ccc['sn']}</span>
                    <span>Order ID #${ccc['id']}</span>
                  </p>
                </div>
                <div class="msg-date">
                  <span class="aero-caption">Last message: ${lmt}</span>
                </div>
                </div>
                <div class="msg-arrow-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                  <path d="M9.5 6.5L15.5 12.5L9.5 18.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>`;
            }
            sorted_o.push(p__o[clm][x]);
          }
        }
        ln = clm;
      }
      $('.chat-list').html(`<div class="chat-list-header"><div class="chat-title aero-b3">All chats</div>
        <div class="link-back">
            <a class="aero-b3" href="/marketplace">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14.5 18L8.5 12L14.5 6" stroke="currentColor" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
              <span>Back</span>
            </a>
          </div>
          </div>
        ${chats_html
        ? `<div class="msg-list-wrapper"><div class="msg-list" id="msg-list">${chats_html}</div></div>`
        : `<div class="no-msg">
            <span>You don't have any messages</span>
          </div>`
      }`);
    } else {
      location.reload();
    }
  }
}

//chat stuff
function img_status(n) {
  return n === 0
    ? `<b class="img_s_1">Deploying</b>`
    : n === 1
      ? `<b class="img_s_3">Deployment failed</b>`
      : `<b class="img_s_2">Deployed</b>`;
}

// 8.4.2023 FROM HERE NEW

function random_str(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function randomize_v2_mandatory_env(pos, env, len) {
  no_v2_mandatory_env[env] = random_str(len);
  $(`#no_mandatory_var_${pos}`).val(no_v2_mandatory_env[env]);
}

var glob_img_sel = {},
  runned_port_type_sel = false,
  tcp_http_stylish_sel = 'tcp',
  no_v2_ports = {},
  no_v2_env = {},
  no_v2_mandatory_env = {},
  no_v2_has_ssh_pubkeys = false,
  no_v2_ssh_pubkeys = [],
  v2_deploy_params = {};

function mandatory_env_handle(env_no, env_name) {
  //console.log(env_no, env_name)
  let c_val = $(`#no_mandatory_var_${env_no}`).val(),
    test = /^[a-zA-Z0-9\s-_:=.@+/]+$/;
  if (c_val.length > 128) c_val = c_val.substring(0, 128);
  if (!test.test(c_val)) {
    let tmp_new_c_val = '';
    for (let i = 0; i < c_val.length; i++) {
      if (test.test(c_val[i])) tmp_new_c_val += c_val[i];
    }
    c_val = tmp_new_c_val;
  }
  if (c_val !== $(`#no_mandatory_var_${env_no}`).val()) $(`#no_mandatory_var_${env_no}`).val(c_val);
  no_v2_mandatory_env[env_name] = c_val;
}

function should_remember_passwords() {
  try {
    if (document.getElementById('example-3')) {
      return !!document.getElementById('example-3').checked;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

function no_v2_hs_dockerhub(force_state) {
  let c_state = $('.hs-dockerhub-token').html().includes('fa-eye-slash') ? 'hide' : 'show';
  let wanted_state = force_state ? force_state : c_state === 'hide' ? 'show' : 'hide';
  $('.hs-dockerhub-token').html(
    `<span><i class="fa-solid fa-eye${wanted_state === 'hide' ? `-slash` : ``}"></i></span>`,
  );
  document.getElementById('mt-dockerhub-token').type =
    wanted_state === 'hide' ? 'password' : 'text';
}

let last_template_id_remove_request = 0;

function get_custom_images_rendered_cnt() {
  return (
    ($('.private-images-place').html() ? $('.private-images-place').html() : '').split(
      '<div class="acc-img-obj image-sel-',
    ).length - 1
  );
}

function rm_custom_template(pos) {
  last_template_id_remove_request = pos;
  let desired_img = glob_img_sel[pos.toString()];
  $('.remove-template-text').html(
    `<span class="aero-b1">Do you really want to remove template «${desired_img['name']}»?</span>`,
  );
  $('.remote-template-alert').css('display', 'flex');
}

async function proceed_template_remove() {
  let pos = parseInt(last_template_id_remove_request),
    cerr = '';
  let r = await call_api('rm_template', {
    name: glob_img_sel[pos.toString()]['name'],
  }).catch(function (err) {
    cerr = err;
  });
  $('.remote-template-alert').css('display', 'none');
  $('.mt-configure-box').css('display', 'none');
  if (cerr) {
    aero_modal_alert('market-alert', {text: 'Connection failure'});
  } else if (r['status']) {
    $(`.image-sel-${pos}`).remove();
    if (get_custom_images_rendered_cnt() === 0) {
      $('.private-images-place').remove();
      $('.private-images-dtop').remove();
    }
  } else {
    aero_modal_alert('market-alert', {text: 'Database Failure'});
  }
  //console.log(cerr,r)
}

let last_desired_img = {};
const not_saveable_images = ['cloreai/hiveos', 'cloreai/dynexsolve:0.1', 'cloreai/memehash'];

function new_order_select_img_v2(pos) {
  hive_init_lines = null;
  // TODO: added indication logic
  $('#select-step').removeClass('active');
  $('#configure-step').addClass('active');
  document.getElementById('example-2').checked = false;
  render_v2_monaco();
  no_v2_hs_dockerhub('hide');
  $('.no-v2-alert').html('');
  document.getElementById('example-1').checked = no_v2_has_ssh_pubkeys;
  let l = Object.keys(glob_img_sel).length,
    desired_img = glob_img_sel[pos.toString()],
    show_save_button = false,
    setting_saved_dockerhub_auth = false;
  // console.log(desired_img);
  if (pos.toString() === 'custom') {
    if (saved_dockerhub_login.split(':').length === 2) {
      setting_saved_dockerhub_auth = true;
      $('#mt-dockerhub-username').val(saved_dockerhub_login.split(':')[0]);
      $('#mt-dockerhub-token').val(saved_dockerhub_login.split(':')[1]);
    }
    desired_img = {
      image: $('.v2-custom-img').val(),
      forwarding: {},
    };
    // TODO: selected state
    $('.image-sel-btn-custom').html(`<span style="display: none"><i class="fa-solid fa-circle-check"></i></span>`);
    $('.image-sel-custom').addClass('aero-image-selected');
  } else {
    // $('.image-sel-btn-custom').html(`<span>Select</span>`);
    $('.image-sel-custom').removeClass('aero-image-selected');
  }
  if (!setting_saved_dockerhub_auth) {
    $('#mt-dockerhub-username').val('');
    $('#mt-dockerhub-token').val('');
  }
  for (let i = 0; i < l; i++) {
    pos === i ? $('.image-sel-' + i).addClass('aero-image-selected') : $('.image-sel-' + i).removeClass('aero-image-selected');
    $('.image-sel-btn-' + i).html(
      `<span>${pos === i ? `<i style="display: none;" class="fa-solid fa-circle-check"></i>` : `Select`}</span>`,
    );
  }
  v2_deploy_params['image'] =
    `${desired_img['image']}${desired_img['default-tag'] ? `:${desired_img['default-tag']}` : ''}`;
  if (desired_img['forwarding']) {
    no_v2_ports = desired_img['forwarding'];
    no_v2_render_ports();
  }
  // TODO: change block visible logic
  // $('.mt-configure-order').css('display', 'flex');
  $('.mt-configure-box').css('display', 'flex');
  $('.mt-configure-order .balance__title').css('opacity', '1');
  // $('.img-sel-b .balance__title').css('opacity', '0.6');
  // $('.img-sel-b .images-list').css('display', 'none');
  if (pos.toString() !== 'custom') {
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $('.mt-configure-order').offset().top,
      },
      2,
    );
  }
  no_v2_env = {};
  no_v2_render_env();
  no_v2_mandatory_env = {};
  $('.no-v2-docker-auth').css(
    'display',
    desired_img['official']
      ? 'none'
      : allowed_feature_from_pubkeys.includes('private-containers')
        ? 'flex'
        : 'none',
  );
  if (desired_img['dockerhub_auth'] && desired_img['dockerhub_auth'].split(':').length === 2) {
  } else {
    document.getElementById('docker-auth-check').checked = false;
    render_v2_docker_auth();
  }
  const $save_template_btn = $('.no-v2-save-btn');
  const $remove_template_btn = $('.no-v2-remove-btn');
  if (desired_img['image']) {
    disable_v2_save = false;
    for (let i = 0; i < remember_passwords.length; i++) {
      let crp = remember_passwords[i];
      if (crp === desired_img['image'].split(':')[0]) show_save_button = true;
    }
    if (
      not_saveable_images.includes(desired_img['image']) &&
      allowed_feature_from_pubkeys.includes('templates')
    ) {
      $save_template_btn.css('display', 'none');
      $remove_template_btn.css('display', 'none');
    } else if (allowed_feature_from_pubkeys.includes('templates')) {
      $save_template_btn.css('display', 'flex');
    }
    $save_template_btn.removeClass('aero-btn-secondary-disabled');
  } else if (allowed_feature_from_pubkeys.includes('templates')) {
    disable_v2_save = true;
    $save_template_btn.css('display', 'flex');
    $save_template_btn.addClass('aero-btn-secondary-disabled');
  } else {
    $save_template_btn.css('display', 'none');
  }
  if (desired_img['mandatory_env']) {
    let mandatory_env_html = '';
    for (let i = 0; i < desired_img['mandatory_env'].length; i++) {
      let c_mandatory_env = desired_img['mandatory_env'][i];
      no_v2_mandatory_env[c_mandatory_env['env']] = c_mandatory_env['default_random']
        ? random_str(c_mandatory_env['default_random'])
        : c_mandatory_env['default']
          ? c_mandatory_env['default']
          : '';
      mandatory_env_html += `<div class="mt-forward-port">
                        <div class="mt-env-name${c_mandatory_env['default_random'] ? '' : ` env-nornd`}">
                            <div class="aero-input-wrapper">
                                <div class="env-desc-center noselect">
                                    <div class="env-desc-2 aero-input-sign">
                                        <span>${c_mandatory_env['show_name']}</span>
                                    </div>
                                </div>
                                <input class="aero-input" type="text" id="no_mandatory_var_${i}" value="${no_v2_mandatory_env[c_mandatory_env['env']]}" oninput="mandatory_env_handle(${i},'${c_mandatory_env['env']}')">
                            </div>
                        </div>${
        c_mandatory_env['default_random']
          ? `<div class="mt-port-add aero-btn-primary" onclick="randomize_v2_mandatory_env(${i},'${c_mandatory_env['env']}',${c_mandatory_env['default_random']})">
                            <span>Randomize</span>
                        </div>`
          : ''
      }
                    </div>`;
    }
    $('.aditional-fields-v2').html(
      mandatory_env_html +
      (show_save_button
        ? `<div class="checkbox-wrapper-1 remember-login">
    <input id="example-3" class="substituted" type="checkbox" aria-hidden="true" checked>
    <label for="example-3"><span>Remember login passwords</span></label>
</div>`
        : ''),
    );
  } else if (desired_img['hive']) {
    $('.aditional-fields-v2').html(`<div class="mt-forward-port">
                        <div class="mt-env-name env-nornd">
                            <div class="aero-input-wrapper">
                                <div class="env-desc-center noselect aero-input-sign">
                                    <div class="env-desc-2">
                                        <span>Rig ID</span>
                                    </div>
                                </div>
                                <input class="aero-input" type="text" id="no_v2_hive_rig_id" value="" oninput="hive_validate_rigid(true)">
                            </div>
                        </div>
                    </div>
                    <div class="mt-forward-port">
                        <div class="mt-env-name env-nornd">
                            <div class="aero-input-wrapper">
                                <div class="env-desc-center noselect aero-input-sign">
                                    <div class="env-desc-2">
                                        <span>Rig Password</span>
                                    </div>
                                </div>
                                <input class="aero-input" type="text" id="no_v2_hive_rig_password" value="" oninput="hive_validate_rigpass(true)">
                            </div>
                        </div>
                    </div>
                    <div class="mt-forward-port">
                        <div class="mt-env-name env-nornd">
                            <div class="aero-input-wrapper">
                                <div class="env-desc-center noselect aero-input-sign">
                                    <div class="env-desc-2">
                                        <span>Farm hash</span>
                                    </div>
                                </div>
                                <input class="aero-input" type="text" id="no_v2_hive_fh" value="" oninput="hive_validate_farmhash(true)">
                            </div>
                        </div>
                    </div>`);
  } else {
    $('.aditional-fields-v2').html('');
  }
  let autossh_entrypoint_possible = false;
  if (desired_img['clore_ssh']) {
    $('.no-v2-ssh-auth').css('display', 'flex');
    $('.no-v2-autoinstall-entrypoint').css('display', 'none');
    $('#template-remove-button').css('display', 'none');
    $('#template-save-button').css('display', 'flex');
    document.getElementById('autoinstall-entrypoint-check').checked = false;
    no_v2_render_ssh_auth();
  } else {
    $('.no-v2-ssh-auth').css('display', 'none');
    if (desired_img['official'] || !allowed_feature_from_pubkeys.includes('autossh')) {
      $('.no-v2-autoinstall-entrypoint').css('display', 'none');
      document.getElementById('autoinstall-entrypoint-check').checked = false;
    } else {
      if (desired_img['private_template']) {
        $('#template-remove-button').css('display', 'flex');
        $('#template-save-button').css('display', 'flex');
      } else {
        $('#template-remove-button').css('display', 'none');
        $('#template-save-button').css('display', 'flex');
      }
      $('.no-v2-autoinstall-entrypoint').css('display', 'flex');
      document.getElementById('autoinstall-entrypoint-check').checked = false;
      autossh_entrypoint_possible = true;
    }
  }
  if (desired_img['private_template']) {
    if (autossh_entrypoint_possible && desired_img['autossh_entrypoint'])
      document.getElementById('autoinstall-entrypoint-check').checked = true;
    //console.log("P", desired_img)
    if (desired_img['preset_env']) {
      let preset_env_names = Object.keys(desired_img['preset_env']);
      preset_env_names.forEach((env_name) => {
        let other_rendering = false;
        if (env_name === 'SSH_KEY') {
          let right_key_pos = -1;
          for (x = 0; x < no_v2_ssh_pubkeys.length; x++) {
            let c_key = no_v2_ssh_pubkeys[x];
            if (c_key === desired_img['preset_env'][env_name]) {
              right_key_pos = x;
              break;
            }
          }
          if (right_key_pos >= 0) {
            $('.no-v2-ssh-auth').css('display', 'flex');
            document.getElementById('example-1').checked = true;
            no_v2_render_ssh_auth();
            other_rendering = true;
          }
        } else if (env_name === 'SSH_PASSWORD') {
          $('.no-v2-ssh-auth').css('display', 'flex');
          document.getElementById('example-1').checked = false;
          no_v2_render_ssh_auth();
          other_rendering = true;
          document.getElementById('no_v2_ssh_pass').value = desired_img['preset_env'][env_name];
        } else if (env_name === 'WEBUI_PASSWORD' && desired_img['remember_password']) {
        }
        if (!other_rendering) add_v2_env(env_name, desired_img['preset_env'][env_name]);
      });
      //console.log(desired_img["preset_env"])
    }
    if (desired_img['command']) {
      document.getElementById('example-2').checked = true;
      render_v2_monaco(desired_img['command']);
    }
    if (desired_img['dockerhub_auth']) {
      document.getElementById('docker-auth-check').checked = true;
      render_v2_docker_auth();
      document.getElementById('mt-dockerhub-username').value =
        desired_img['dockerhub_auth'].split(':')[0];
      document.getElementById('mt-dockerhub-token').value =
        desired_img['dockerhub_auth'].split(':')[1];
    }
  }
  last_desired_img = desired_img;
}

function render_v2_autoinstall_entrypoint() {
  if (document.getElementById('autoinstall-entrypoint-check').checked) {
    // verify port 22/TCP forwarding capability
    let no_v2_ports_keys = Object.keys(no_v2_ports),
      fail_to_add = false;
    if (no_v2_ports_keys.includes('22')) {
    } else if (no_v2_ports_keys.length > 4) {
      fail_to_add = true;
      document.getElementById('autoinstall-entrypoint-check').checked = false;
      beautiful_alert(
        '.ba-ports-v2',
        'To activate SSH Autoinstall entrypoint, you need to forward port 22/tcp. But you already have 5 ports forwarded, which is the limit for orders',
        '',
        5,
      );
    } else {
      no_v2_ports['22'] = 'tcp';
      no_v2_render_ports();
    }
    // verify port 22/TCP forwarding capability
    if (!fail_to_add) {
      $('.no-v2-ssh-auth').css('display', 'flex');
      no_v2_render_ssh_auth();
    }
  } else {
    $('.no-v2-ssh-auth').css('display', 'none');
  }
}

function ssh_autoinstall_info() {
  $('.show-autossh-info').css('display', 'flex');
}

let v2_order_type = '',
  v2_server_id = 0;

function v2_custom_img_name_validation() {
  let init = $('.v2-custom-img').val();
  if (init.length > 128) init = init.substring(0, 128);
  if (!/^[a-zA-Z0-9:@/._-]+$/.test(init) || init.split(':').length > 2 || init.split('/').length > 3) {
    let tmp_init = '', d_dots = 0, slashes = 0;
    for (var i = 0; i < init.length; i++) {
      if (init[i] == ':') {
        if (d_dots == 0) tmp_init += init[i];
        d_dots++;
      } else if (init[i] == '/') {
        if (d_dots == 0) {
          if (slashes < 2) tmp_init += init[i];
          slashes++;
        }
      } else if (/^[a-zA-Z0-9:@/._-]+$/.test(init[i])) tmp_init += init[i];
    }
    init = tmp_init;
  }
  if (init != $('.v2-custom-img').val()) $('.v2-custom-img').val(init);
  $('.image-sel-custom').click();
}


function render_specs_info(data) {
  return `<span title="${data}">${data}</span>`;
}

function render_images(
  images,
  pubkeys_res,
  deployment_fee,
  currency,
  deployment_fee_minutes,
  order_type,
  server_id,
) {
  v2_server_id = server_id;
  v2_order_type = order_type;
  deployment_fee = parseFloat(deployment_fee);
  $('.no-v2-deployment-fee').html(
    `<div>
      <div><svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 4.66667H8.50599M8.5 11.3333V7.33333H7.83333M14.5 8C14.5 11.3137 11.8137 14 8.5 14C5.18629 14 2.5 11.3137 2.5 8C2.5 4.68629 5.18629 2 8.5 2C11.8137 2 14.5 4.68629 14.5 8Z" stroke="#F73737" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Creation fee:</div>${currency === 'bitcoin' ? deployment_fee.toFixed(8) : deployment_fee.toFixed(4)} ${currency === 'bitcoin' ? 'BTC' : currency === 'CLORE-Blockchain' ? 'CLORE' : 'USD'}${deployment_fee_minutes ? ` + ${deployment_fee_minutes} minute of rental` : ''}
            </div>`,
  );
  // TODO: changed
  // $('.mt-configure-order').css('display', 'none');
  $('.mt-configure-box').css('display', 'none');
  $('.mt-configure-order .balance__title').css('opacity', '0.6');
  v2_deploy_params['currency'] = currency;
  if (pubkeys_res.keys) {
    if (pubkeys_res.keys.length > 0) {
      no_v2_ssh_pubkeys = pubkeys_res.keys;
      no_v2_has_ssh_pubkeys = true;
    } else {
      no_v2_ssh_pubkeys = [];
    }
  }
  if (server_id === -1) {
    $('.v2-no-server-specs').css('display', 'none');
    $('.secure-cloud-server-specs').css('display', 'flex');
    document.getElementById('secure-gpus').value = 1;
    render_secure_cloud_package(1);
    resizeInput('secure-disk-val', true);
  } else if (relevant_server_info[server_id]) {
    $('.secure-cloud-server-specs').css('display', 'none');
    $('.v2-no-server-specs').css('display', 'flex');
    let price = 0;
    try {
      price =
        relevant_server_info[server_id]['price'][order_type === 'on-demand' ? 'on_demand' : 'spot'][
          market_currency
          ];
      if (market_currency.toLocaleLowerCase() === 'usd') price = price / 100;
    } catch (e) {
    }
    document.getElementById('sn-v2-gpu').innerHTML = render_specs_info(relevant_server_info[server_id]['gpu']);
    document.getElementById('sn-v2-vram').innerText = relevant_server_info[server_id]['vram'];
    document.getElementById('sn-v2-pci').innerText = relevant_server_info[server_id]['pci'];
    document.getElementById('sn-v2-cpu').innerHTML = render_specs_info(relevant_server_info[server_id]['cpu']);
    //document.getElementById('sn-v2-reliability').innerText = relevant_server_info[server_id]['reliability'];
    document.getElementById('sn-v2-mb').innerHTML = render_specs_info(relevant_server_info[server_id]['mb']);
    document.getElementById('sn-v2-ram').innerText = relevant_server_info[server_id]['ram'];
    document.getElementById('sn-v2-cpus').innerText = relevant_server_info[server_id]['cpus'];
    document.getElementById('sn-v2-disk').innerHTML = render_specs_info(relevant_server_info[server_id]['disk']);
    document.getElementById('sn-v2-pds').innerText = relevant_server_info[server_id]['pds'];
    document.getElementById('sn-v2-diskStorage').innerText = relevant_server_info[server_id]['diskStorage'];
    document.getElementById('sn-v2-cuda').innerText = relevant_server_info[server_id]['cuda'] ? relevant_server_info[server_id]['cuda'] : '';
    document.getElementById('sn-v2-loc').innerText = relevant_server_info[server_id]['location'] ? relevant_server_info[server_id]['location'] : '';
    document.getElementById('sn-v2-speed-up').innerText = relevant_server_info[server_id]['speed_up'];
    document.getElementById('sn-v2-speed-down').innerText = relevant_server_info[server_id]['speed_down'];
    document.getElementById('sn-v2-price-str').innerText = relevant_server_info[server_id]['price_str'];
    document.getElementById('sn-v2-price-str').innerText = relevant_server_info[server_id]['price_str'];
    document.getElementById('sn-v2-md-str').innerText = relevant_server_info[server_id]['md_str'];

    // document.getElementById('sn-v2-price').innerText =
    //   `${price ? parseFloat(price).toFixed(market_currency === 'usd' || market_currency === 'CLORE-Blockchain' ? 2 : 8) : '?'} ${market_currency === 'CLORE-Blockchain' ? 'CLORE' : market_currency === 'bitcoin' ? 'BTC' : 'USD'}/day`;
  } else {
    location.reload();
  }
  if (!runned_port_type_sel) {
    /*Dropdown Menu*/
    $('.dropdown').click(function () {
      $(this).attr('tabindex', 1).focus();
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(200);
    });
    $('.dropdown').focusout(function () {
      $(this).removeClass('active');
      $(this).find('.dropdown-menu').slideUp(200);
    });
    $('.dropdown .dropdown-menu li').click(function () {
      $(this).parents('.dropdown').find('span').text($(this).text());
      $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
    });
    $('.ncentert-pa-click').click(function () {
      no_v2_add_port();
    });
    $('.ncenter-ev-click').click(function () {
      add_v2_env();
    });
    $('#mt-env-val').keyup(function (event) {
      if (event.keyCode === 13) add_v2_env();
    });
    $('#mt-env-name').keyup(function (event) {
      if (event.keyCode === 13) add_v2_env();
    });
    $('#mt-port-num').keyup(function (event) {
      if (event.keyCode === 13) no_v2_add_port();
    });

    /*End Dropdown Menu*/

    $('.dropdown-menu li').click(function () {
      tcp_http_stylish_sel = $(this).parents('.dropdown').find('input').val();
    });
    runned_port_type_sel = true;
  }
  let images_keys = Object.keys(images),
    new_html = '',
    new_glob_imgs = {},
    new_glob_img_pos = 0,
    is_private_ids = [];
  for (let i = 0; i < images_keys.length; i++) {
    let c_key = images_keys[i],
      img_html = '',
      any_private = false;
    for (let x = 0; x < images[c_key].length; x++) {
      let c_image = images[c_key][x];
      new_glob_imgs[new_glob_img_pos] = c_image;

      let right_container_content = `<div class="acc-select-btn image-sel-btn-${new_glob_img_pos}">
    <span>Select</span>
</div>`;

      if (c_image['private_template']) {
        right_container_content += `<div class="flexbreak"></div><div class="template-rm-btn image-rm-btn-${new_glob_img_pos}">
    <span><i class="fa-solid fa-trash-can"></i></span>
</div>`;
        is_private_ids.push(new_glob_img_pos);
        any_private = true;
      }

      img_html += `<div class="acc-img-obj image-sel-${new_glob_img_pos}">
                    <div class="acc-img-logo noselect">
                        <img src="${c_image['logo'] ? (c_image['logo'].substring(0, 4) === 'http' ? c_image['logo'] : `../images/icon/` + c_image['logo']) : `/assets/container-img/docker.svg`}">
                    </div>
                    <div class="acc-img-name">
                        <span class="img-t-n">${c_image['name']}</span>
                        <span>${c_image['image']}${c_image['default-tag'] ? ':' + c_image['default-tag'] : ''}</span>
                    </div>
                </div>`;
      new_glob_img_pos++;
    }

    new_html += `
            <div class="acc-d-img-c${any_private ? ' private-images-place' : ''}">
                <div class="img-category-name aero-b1">
                    <span>${c_key}</span>
                </div>
                <div class="aero-rent-container">
                    ${img_html}
                </div>
            </div>`;
  }
  new_html += `
            <div class="acc-d-img-c">
                <div class="img-category-name aero-b1">
                    <span>Custom image</span>
                </div>
                <div class="aero-rent-container">
                    <div class="image-sel-custom">
                        <div class="acc-img-logo noselect">
                            <img src="/assets/container-img/docker.svg" alt="docker">
                        </div>
                        <div class="acc-img-name custom-img-name">
                            <input class="v2-custom-img aero-input" type="text" placeholder="Any docker image from any registry..." oninput="v2_custom_img_name_validation()">
                        </div>
                        <div class="acc-select-container noselect" style="display: none">
                          <div class="acc-select-btn image-sel-btn-custom">
                              <span>Select</span>
                          </div>
                        </div>
                    </div>
                </div>
            </div>`;
  $('.images-list').html(new_html);
  for (let i = 0; i < new_glob_img_pos; i++) {
    $(`.image-sel-${i}`).click(function () {
      let a = 0;
      for (let i = 0; i < this.classList.length; i++)
        if (this.classList[i].includes('image-sel-')) a = parseInt(this.classList[i].substring(10));
      return new_order_select_img_v2(a);
    });
    if (is_private_ids.includes(i)) {
      $(`.image-rm-btn-${i}`).click(function (event) {
        event.stopPropagation();
        let a = 0;
        for (let i = 0; i < this.classList.length; i++)
          if (this.classList[i].includes('image-rm-btn-'))
            a = parseInt(this.classList[i].substring(13));
        return rm_custom_template(a);
      });
    }
  }
  try {
    $(`.image-sel-custom`).click(function () {
      return new_order_select_img_v2('custom');
    });
  } catch (e) {
  }
  glob_img_sel = new_glob_imgs;
}

function on_remove_template () {
  const activeTemplate = document.querySelector('.aero-image-selected');
  let a = 0;
  for (let i = 0; i < activeTemplate.classList.length; i++)
    if (activeTemplate.classList[i].includes('image-sel-'))
      a = parseInt(activeTemplate.classList[i].substring(10));
  rm_custom_template(a);
}

function replaceSymbols(str) {
  return str.replace(/[^0-9a-zA-Z ]/g, '');
}

function mt_verify_port() {
  const x = $('#mt-port-num');

  x.val(replaceSymbols(x.val()));

  if (x.val() !== '') {
    let nv = Math.abs(parseInt(x.val()));
    if (nv > 65535) nv = 65535;
    if (nv < 1) nv = 1;
    x.val(nv);
  }
}

function no_v2_add_port() {
  if ($('#mt-port-num').val() === '') return;
  if (Object.keys(no_v2_ports).length > 4) {
    beautiful_alert('.ba-ports-v2', 'Maximum of forwarded ports is 5', '', 5);
  } else if (tcp_http_stylish_sel === 'http' && JSON.stringify(no_v2_ports).includes('http')) {
    beautiful_alert('.ba-ports-v2', 'Only one HTTP port can be forwarded', '', 5);
  } else {
    clear_beautiful_alert('.ba-ports-v2');
    no_v2_ports[$('#mt-port-num').val()] = tcp_http_stylish_sel;
  }
  no_v2_render_ports();
  $('#mt-port-num').val('');
}

function remove_v2_port(n) {
  delete no_v2_ports[n.toString()];
  no_v2_render_ports();
}

function add_v2_env(in_env_name, in_env_val) {
  let env_name = $('#mt-env-name').val(),
    env_value = $('#mt-env-val').val(),
    test = /^[a-zA-Z0-9\s-_:=.@+/]+$/;
  if (in_env_name) env_name = in_env_name;
  if (in_env_val) env_value = in_env_val;
  if (!env_name | !env_value) {
    beautiful_alert('.ba-env-v2', `Variable name and value must be defined`, '', 5);
  } else if (env_name.length > 64) {
    beautiful_alert('.ba-env-v2', `Variable name can be maximum 64 characters long`, '', 5);
  } else if (!test.test(env_name)) {
    beautiful_alert(
      '.ba-env-v2',
      `Variable name containes not allowed character <b id="nal-v2-env"></b>`,
      '',
      5,
    );
    let c = false;
    for (let i = 0; i < env_name.length && !c; i++) {
      if (!test.test(env_name[i])) {
        c = true;
        document.getElementById('nal-v2-env').innerText = env_name[i];
      }
    }
  } else if (env_value.length > 1536) {
    beautiful_alert('.ba-env-v2', `Variable value can be maximum 1536 characters long`, '', 5);
  } else if (!test.test(env_value)) {
    beautiful_alert(
      '.ba-env-v2',
      `Variable value containes not allowed character <b id="nal-v2-env"></b>`,
      '',
      5,
    );
    let c = false;
    for (let i = 0; i < env_value.length && !c; i++) {
      if (!test.test(env_value[i])) {
        c = true;
        document.getElementById('nal-v2-env').innerText = env_value[i];
      }
    }
  } else if (Object.keys(no_v2_env).length > 4) {
    beautiful_alert('.ba-env-v2', `Maximum of variables is 5`, '', 5);
  } else {
    no_v2_env[env_name] = env_value;
    no_v2_render_env();
  }
  $('#mt-env-name').val('');
  $('#mt-env-val').val('');
}

function no_v2_render_ports() {
  let phtml = '';
  for (let i = 0; i < Object.keys(no_v2_ports).length; i++) {
    phtml += `<div class="mt-forward-port">
                        <div class="aero-input-wrapper">
                            <div class="fp-sign noselect aero-input-sign">
                            <div>Port number</div>
                        </div>
                        <div class="mt-port-input">
                            <input class="aero-input" type="number" id="mt-port-num" value="${Object.keys(no_v2_ports)[i]}" readonly>
                        </div>
                        </div>
                        <div class="mt-port-type noselect">
                            <span>${no_v2_ports[Object.keys(no_v2_ports)[i]].toUpperCase()}</span>
                        </div>
                        <div class="mt-port-add noselect" onclick="remove_v2_port(${Object.keys(no_v2_ports)[i]})">
                            <div class="mt-port-add ncentert-pa-click aero-btn-primary">
                                <span>Delete</span>
                            </div>
                        </div>
                    </div>`;
  }
  $('.forwarded-ports-v2').html(phtml);
}

function no_v2_remove_env(name) {
  delete no_v2_env[name];
  no_v2_render_env();
}

function no_v2_render_env() {
  let phtml = '';
  for (var i = 0; i < Object.keys(no_v2_env).length; i++) {
    phtml += `<div class="mt-forward-port">
                    <div class="mt-env-name aero-input-wrapper">
                        <div class="env-desc-center noselect">
                            <div class="env-desc-2 aero-input-sign">
                                <span>Name</span>
                            </div>
                        </div>
                        <input class="aero-input" type="text" id="mt-env-name-s${i}" readonly>
                    </div>
                    <div class="mt-env-val aero-input-wrapper">
                        <div class="env-desc-center noselect">
                            <div class="env-desc-2 aero-input-sign">
                                <span>Value</span>
                            </div>
                        </div>
                        <input class="aero-input" type="text" id="mt-env-val-s${i}" readonly>
                    </div>
                    <div class="mt-port-add noselect aero-btn-primary" onclick="no_v2_remove_env('${Object.keys(no_v2_env)[i]}')">
                        <span>Delete</span>
                    </div>
                </div>`;
  }
  $('.overview-env-v2').html(phtml);
  for (var i = 0; i < Object.keys(no_v2_env).length; i++) {
    let env_name = Object.keys(no_v2_env)[i];
    let env_value = no_v2_env[env_name];
    document.getElementById(`mt-env-name-s${i}`).value = env_name;
    document.getElementById(`mt-env-val-s${i}`).value = env_value;
  }
}

function no_v2_render_ssh_auth() {
  let key = document.getElementById('example-1').checked,
    key_html = '';
  let ssh_pubkeys =  '';
  if (key && no_v2_ssh_pubkeys.length > 0) {
    if (no_v2_ssh_pubkeys.length === 1) {
      ssh_pubkeys =  `
                    <div id="pubkey-dropdown" class="dropdown no-select">
                      <div class="select" >
                        <span id="selected-ssh-pubkey">${no_v2_ssh_pubkeys[0].split(' ')[2]}</span>
                      </div>
                    </div>
                  `
    }
    if (no_v2_ssh_pubkeys.length > 1) {
      for (let i = 0; i < no_v2_ssh_pubkeys.length; i++) {
        const key_label = no_v2_ssh_pubkeys[i].split(' ')[2];
        key_html += `<li value="${i}" onclick="update_ssh_pubkey('${key_label}', '${i}')">${key_label}</li>`;
      }
      ssh_pubkeys = `
                  <div id="pubkey-dropdown" class="dropdown">
                      <div class="select" >
                        <span id="selected-ssh-pubkey">${no_v2_ssh_pubkeys[0].split(' ')[2]}</span>
                      </div>
                      <ul class="dropdown-menu">
                        ${key_html}
                      </ul>
                    </div>
                  `
    }
  }

  $('.v2-ssh-auth').html(
    key
      ? `<div class="mt-env-name mt-ttl-env">
                <div class="env-desc-center noselect">
                    <div class="env-desc-2">
                        <span class="aero-b4">SSH Public Key</span>
                    </div>
                </div>
                ${no_v2_has_ssh_pubkeys ? `<div id="pubkey-dropdown-wrapper">${ssh_pubkeys}</div>` : `<div class="no-pubkey-v2"><span class="aero-b4">Please configure your public key under your account</span><div class="aero-btn-primary"><a href="/account#keys" target="_blank">Account</a></div></div>`}
            </div>`
      : `<div class="mt-env-name">
              <div class="aero-input-wrapper">
                <div class="env-desc-center noselect">
                  <div class="env-desc-2 aero-input-sign">
                    <span>SSH Password</span>
                  </div>
                </div>
                <input class="aero-input" type="text" id="no_v2_ssh_pass" value="${random_str(18)}">
               </div>
            </div>
            <div class="mt-port-add aero-btn-primary" onclick="randomize_psw('#no_v2_ssh_pass',18)">
                <span>Randomize</span>
            </div>`,
  );

  $('#pubkey-dropdown').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.dropdown-menu').slideToggle(200);
  });
  $('#pubkey-dropdown').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.dropdown-menu').slideUp(200);
  });
}

function update_ssh_pubkey(label, index) {
  document.getElementById('selected-ssh-pubkey').innerText = `${label}`;
  selected_ssh_pubkey = index;
}

var v2_enabled_monaco = false,
  v2_monaco;

function render_v2_monaco(init_lines) {
  if (!init_lines && hive_init_lines) {
    init_lines = hive_init_lines;
  }
  v2_enabled_monaco = document.getElementById('example-2').checked;
  $('.no-v2-startup-monaco').css('display', v2_enabled_monaco ? `flex` : `none`);
  if (v2_enabled_monaco) {
    require.config({ paths: { vs: 'monaco-editor/min/vs' } });
    require(['vs/editor/editor.main'], function () {
      monaco.editor.defineTheme('monokai', monokai_theme);
      monaco.editor.setTheme('monokai');
      v2_monaco = monaco.editor.create(document.getElementById('no-v2-monaco'), {
        value: init_lines
          ? init_lines
          : [`#!/bin/sh`, `#HERE YOU CAN WRITE YOUR INIT SCRIPT`].join('\n'),
        language: 'shell',
        minimap: { enabled: false },
        fontSize: 16,
        fontFamily: 'TT-Firs-Neue',
      });
    });
  } else {
    $('#no-v2-monaco').html('');
    v2_monaco = undefined;
  }
}

function render_v2_docker_auth() {
  let russia_disable = false;
  /*if($("#sn-v2-loc").html()=='RU' && document.getElementById("docker-auth-check").checked==true){
        russia_disable=true
        document.getElementById("docker-auth-check").checked=false
    }*/
  let v2_docker_auth_enables = document.getElementById('docker-auth-check').checked;
  $('.no-v2-docker-auth-fields').css(
    'display',
    v2_docker_auth_enables
      ? allowed_feature_from_pubkeys.includes('private-containers')
        ? 'flex'
        : 'none'
      : 'none',
  );
  if (russia_disable) {
    aero_modal_alert('market-alert', {text: `Due to end of DockerHub operation in Russia, it's currently unavailable to deploy private images.<br>Public image deployment is handled throut mirror`});
  }
}

let can_v2_create = true,
  last_new_template_config = {};

function process_save_template(config) {
  last_new_template_config = config;
  let already_exists = false; // todo: auto get the state if only overwrite or new
  try {
    if (last_desired_img['private_template']) already_exists = true;
  } catch (e) {
  }
  if (already_exists) {
    $('.no-v2-save-btn').html(`<span><i class="fa-solid fa-circle-notch fa-spin"></i></span>`);
    send_save_template(last_desired_img['name'], last_new_template_config, true);
  } else {
    clear_beautiful_alert('.new-template-bi');
    $('.new-template-naming').css('display', 'flex');
  }
}

function validate_template_name(element) {
  element.value = element.value.replace(/[^a-zA-Z0-9 ]/g, '');
}

async function send_save_template(template_name, template, update) {
  let cerr = '';
  if (!update) $('.fullscreen-loading').css('display', 'flex');
  let api_res = await call_api('save_template', {
    template,
    name: template_name,
    overwrite: !!update,
  }).catch(function (err) {
    cerr = err;
  });
  if (update) {
    if (cerr) {
      aero_modal_alert('market-alert', {text: 'Failed saving template - connection issue'})
    } else if (api_res['error']) {
      if (api_res['error'] === 'reached_limit') {
        aero_modal_alert('market-alert', {text: 'You have reaced limit of templates you can have under your account'});
      } else {
        aero_modal_alert('market-alert', {text: 'Failed saving template - server side issue'});
      }
    }
    $('.no-v2-save-btn').html(`<span>Save template</span>`);
  } else {
    if (cerr) {
      aero_modal_alert('market-alert', {text: 'Failed saving template - connection issue'});
    } else if (api_res['error']) {
      aero_modal_alert('market-alert', {text: 'Failed saving template - server side issue'});
    } else {
      replicate_last_show_no('saving');
    }
    $('.fullscreen-loading').css('display', 'none');
  }
  //console.log(cerr,api_res)
}

function confirm_create_template() {
  let new_template_name = document.getElementById('template-name').value;
  if (new_template_name === '') {
    beautiful_alert('.new-template-bi', `Name can't be empty`);
  } else {
    $('.new-template-naming').css('display', 'none');
    console.log('F', last_new_template_config);
    send_save_template(new_template_name, last_new_template_config);
  }
}

var disable_v2_save = false;

async function no_v2_create(save_template) {
  if (!can_v2_create) return;
  if (save_template && disable_v2_save) return;

  can_v2_create = false;

  let is_overwrite = false;

  try {
    if (last_desired_img['private_template']) is_overwrite = true;
  } catch (e) {}

  if (save_template) {
    if (get_custom_images_rendered_cnt() >= user_templates_limit && !is_overwrite) {
      $('.template-limit-alert-txt').html(
        `You have reached limit of ${user_templates_limit} templates per user account`,
      );
      $('.reached-max-templates-alert').css('display', 'flex');

      return;
    }
    can_v2_create = true;
  } else {
    $('.no-v2-create-btn').html(`<span><i class="fa-solid fa-cog fa-spin"></i></span>`);
  }
  let do_deploy = true,
    cerr = '',
    no_dockerhub_auth = '';
  if (document.getElementById('docker-auth-check').checked) {
    const username = $('#mt-dockerhub-username').val();
    const token = $('#mt-dockerhub-token').val();
    no_dockerhub_auth = username !== '' && token !== '' ? `${username}:${token}` : '';
  }
  v2_deploy_params['dockerhub_auth'] = no_dockerhub_auth;
  if ($('.image-sel-btn-custom').html().includes('circle-check')) {
    v2_deploy_params['image'] = $('.v2-custom-img').val();
    if (v2_deploy_params['image'] === '') {
      do_deploy = false;
      beautiful_alert('.no-v2-alert', 'Type your desired image name', '', 6);
    }
  }
  $('.no-v2-alert').html('');
  v2_deploy_params['ports'] = no_v2_ports;
  v2_deploy_params['env'] = JSON.parse(JSON.stringify(no_v2_env));
  for (let i = 0; i < Object.keys(no_v2_mandatory_env).length; i++) {
    let c_env = Object.keys(no_v2_mandatory_env)[i];
    v2_deploy_params['env'][c_env] = no_v2_mandatory_env[c_env];
  }
  if ($('.no-v2-ssh-auth').css('display') === 'flex') {
    if (document.getElementById('no_v2_ssh_pass')) {
      if (document.getElementById('no_v2_ssh_pass').value)
        v2_deploy_params['env']['SSH_PASSWORD'] = document.getElementById('no_v2_ssh_pass').value;
    } else if (document.getElementById('pubkey-dropdown-wrapper')) {
      if (no_v2_has_ssh_pubkeys)
        v2_deploy_params['env']['SSH_KEY'] =
          no_v2_ssh_pubkeys[selected_ssh_pubkey];
    }
  }
  if (v2_monaco) {
    let c_monaco_val = v2_monaco.getValue();
    if (c_monaco_val.length > 16384) {
      beautiful_alert('.no-v2-alert', 'Startup script maximum length is 16384 characters', '', 6);
      do_deploy = false;
    } else {
      v2_deploy_params['command'] = c_monaco_val;
    }
  }
  v2_deploy_params['type'] = v2_order_type;
  v2_deploy_params['renting_server'] = v2_server_id;
  if (do_deploy && relevant_server_info[v2_server_id]) {
    try {
      if (relevant_server_info[v2_server_id]['price']['on_demand'][v2_deploy_params['currency']]) {
        v2_deploy_params['required_price'] =
          relevant_server_info[v2_server_id]['price']['on_demand'][v2_deploy_params['currency']];
      }
    } catch (e) {
      console.error('Internal fail', e);
    }
    //relevant_server_info
  }
  if (v2_server_id === -1) {
    v2_deploy_params['secure_cloud_configuration'] = parseInt($('#secure-gpus').val());
    v2_deploy_params['secure_cloud_storage_size'] = parseInt($('#secure-disk-gb').val());
  }
  if (should_remember_passwords()) v2_deploy_params['remember_password'] = true;
  if (save_template) {
    document.getElementById('template-name').value = '';
    let t_json = {
      dockerhub_auth: v2_deploy_params['dockerhub_auth'],
      env: v2_deploy_params['env'],
      image: v2_deploy_params['image'],
      ports: v2_deploy_params['ports'],
      remember_passwords: v2_deploy_params['remember_password'],
    };
    if (v2_deploy_params['command']) t_json['command'] = v2_deploy_params['command'];
    if (
      $('.no-v2-autoinstall-entrypoint').css('display') === 'flex' &&
      document.getElementById('autoinstall-entrypoint-check').checked
    ) {
      t_json['autossh_entrypoint'] = true;
    }
    process_save_template(t_json);
    //return v2_deploy_params
  } else if (do_deploy) {
    if (
      $('.no-v2-autoinstall-entrypoint').css('display') === 'flex' &&
      document.getElementById('autoinstall-entrypoint-check').checked
    ) {
      v2_deploy_params['autossh_entrypoint'] = true;
    }

    let api_res = await call_api("create_order", v2_deploy_params).catch(function (err) {
      cerr = err;
    });
    if (cerr) {
      beautiful_alert('.no-v2-alert', 'Connection error', '', 6);
      no_create_working = false;
    } else if (api_res['error'] && api_res['error'].toString().substring(0, 10) === 'dockerhub-') {
      beautiful_alert(
        '.no-v2-alert',
        `<i class="fa-solid fa-key"></i> Invalid DockerHub authentication`,
        '',
        6,
      );
      no_create_working = false;
    } else if (api_res['error'] === 'reached_order_limit') {
      beautiful_alert('.no-v2-alert', 'You have reached your order limit', '', 6);
      no_create_working = false;
    } else if (api_res['error'] === 'reached_order_limit_per_day') {
      beautiful_alert(
        '.no-v2-alert',
        `You have reached your daily order limit - (${api_res['limit']} orders/day)`,
        '',
        6,
      );
      no_create_working = false;
    } else if (api_res['error'] === 'server-already-rented') {
      beautiful_alert('.no-v2-alert', 'This server is already rented', '', 6);
      no_create_working = false;
    } else if (api_res['error'] === 'server-dont-exist' || api_res['error'] === 'server-offline') {
      beautiful_alert('.no-v2-alert', 'This server is not available', '', 6);
      no_create_working = false;
    } else if (api_res['error'] === 'not_enough_balance') {
      beautiful_alert(
        '.no-v2-alert',
        `<i class="fa-solid fa-sack-dollar"></i> You don't have enough balance to create order`,
        '',
        6,
      );
      no_create_working = false;
    } else if (api_res['error'] === 'compute-not-available') {
      $('.so-alert-txt').html(
        `<span>Not enough capacity is available in our datacenter to deploy your instance, please try again later</span>`,
      );
      // $('.show-sorder-alert').css('display', 'flex');
      showModalAlert();
    } else if (api_res['error'] === 'pre-launch') {
      $('.so-alert-txt').html(`<span style="
    text-align: center;
    margin-left: auto;
    margin-right: auto;
">Secure cloud will be launching on May 10 @ 13:00 UTC</span>`);
      // $('.show-sorder-alert').css('display', 'flex');
      showModalAlert();
    } else if (api_res['error'] === 'price_not_matching') {
      beautiful_alert(
        '.no-v2-alert',
        `<i class="fa-solid fa-sack-dollar"></i> The machine isn't anymore available for this price`,
        '',
        6,
      );
      no_create_working = false;
    } else if (api_res['error'] === 'wait') {
      can_v2_create = true;
      setTimeout(function () {
        no_v2_create();
      }, 1000);
    } else if (api_res['error']) {
      try {
        if (v2_deploy_params.command.toString().length > 16384) {
          beautiful_alert(
            '.no-v2-alert',
            'Startup script exceeded maximum length 16384 characters',
            '',
            6,
          );
        } else {
          beautiful_alert('.no-v2-alert', 'Database error', '', 6);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      can_v2_create = true;
      mk_top_select('mt-mo');
      try {
        let s_obj = document.getElementById(server_mt_obj);
        if (s_obj) s_obj.remove();
      } catch (e) {
        console.error(e);
      }
    }
  } else {
  }
  can_v2_create = true;
  $('.no-v2-create-btn').html(`<span>Create</span>`);
}

/**
 * Calculates the logarithmic value based on the given position, minimum and maximum output values,
 * and minimum and maximum slider values.
 *
 * @param {number} position - The position value.
 * @param {number} minOutput - The minimum output value.
 * @param {number} maxOutput - The maximum output value.
 * @param {number} minSlider - The minimum slider value.
 * @param {number} maxSlider - The maximum slider value.
 * @return {number} The calculated logarithmic value.
 */
function logValue(position, minOutput, maxOutput, minSlider, maxSlider) {
  if(position==minSlider && minOutput==0) return 0
  if(minOutput==0) minOutput=1
  const minValue = Math.log(minOutput);
  const maxValue = Math.log(maxOutput);

  const scaleFactor = (maxValue - minValue) / (maxSlider - minSlider);

  return Math.exp(minValue + scaleFactor * (position - minSlider));
}

/**
 * Updates the server list by resetting the rendering position, updating the HTML
 * content of the server list element, saving the marketplace query, and handling
 * the order rendering query.
 *
 * @return {void}
 */
function update_servers_list() {
  render_instances_pos = 0;
  $('#mt-servers').html(secure_sw_html);
  save_marketplace_query();
  handle_order_render_query();
}

/**
 * Updates the marketplace servers by resetting the rendering position,
 * updating the HTML content of the server list element,
 * saving the marketplace query, and calling the marketplace servers.
 *
 * @return {void} No return value
 */
async function updateMarketplaceServers() {
  render_instances_pos = 0;
  // $('#mt-servers').html(secure_sw_html);
  const filters_block = $('.filters');
  filters_block.addClass('loading');
  save_marketplace_query();
  disableFilter('market-cuda');
  await call_marketplace_servers(true).finally(() => {
    filters_block.removeClass('loading');
  });
}

/**
 * Sets the range of relevant GPUs based on the minimum and maximum values.
 *
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @return {void} This function does not return a value.
 */
function setRelevantGPU(min, max) {
  relevant_min_gpu = min;
  relevant_max_gpu = max;
}

/**
 * Sets the range of relevant CPUs based on the minimum and maximum values.
 *
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @return {void} This function does not return a value.
 */
function setRelevantCPU(min, max) {
  for_log_min_cpu_core = min
  for_log_max_cpu_core = max
  relevant_min_cpu_core = Math.round(logValue(min, 1, 512, 1, 4096));
  relevant_max_cpu_core = Math.round(logValue(max, 1, 512, 1, 4096));
}

/**
 * Sets the range of relevant CPUs based on the minimum and maximum values.
 *
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @return {void} This function does not return a value.
 */
function setRelevantInternetUp(min, max) {
  for_log_min_internet_up_speed = min
  for_log_max_internet_up_speed = max
  relevant_min_internet_up_speed = Math.round(logValue(min, 0, 10000, 1, 10001));
  relevant_max_internet_up_speed = Math.round(logValue(max, 0, 10000, 1, 10001));
}

/**
 * Sets the range of relevant CPUs based on the minimum and maximum values.
 *
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @return {void} This function does not return a value.
 */
function setRelevantInternetDown(min, max) {
  for_log_min_internet_down_speed = min
  for_log_max_internet_down_speed = max
  relevant_min_internet_down_speed = Math.round(logValue(min, 1, 10000, 1, 10001));
  relevant_max_internet_down_speed = Math.round(logValue(max, 1, 10000, 1, 10001));
}

/**
 * Sets the minimum and maximum values for GPU VRAM.
 *
 * @param {number} min - The minimum value for GPU VRAM.
 * @param {number} max - The maximum value for GPU VRAM.
 * @return {void} This function does not return a value.
 */
function setGPUVRAM(min, max) {
  relevant_gpu_max_mem = Math.round(logValue(max, 2, 128, 2, 1280));
  relevant_gpu_mem = Math.round(logValue(min, 2, 128, 2, 1280));
  for_log_gpu_max = max;
  for_log_gpu_min = min;
}

/**
 * Sets the minimum and maximum values for RAM and calculates the relevant minimum and maximum memory values.
 *
 * @param {number} min - The minimum value of RAM.
 * @param {number} max - The maximum value of RAM.
 * @return {void} This function does not return a value.
 */
function setRAM(min, max) {
  for_log_memory_min = min;
  for_log_memory_max = max;
  relevant_min_mem = Math.round(logValue(min, 1, 8192, 1, 10240));
  relevant_max_mem = Math.round(logValue(max, 1, 8192, 1, 10240));
}

/**
 * Sets the reliability values based on the given minimum and maximum values.
 *
 * @param {number} min - The minimum value for reliability.
 * @param {number} max - The maximum value for reliability.
 * @return {void} This function does not return a value.
 */
function setReliability(min, max) {
  const maxValue = parseInt(max);
  const minValue = 100000 - maxValue;

  for_log_reliability = maxValue;
  relevant_min_reliability =
    minValue < 5 ? 100 : 100 - parseInt(Math.round(logValue(minValue, 1, 10000, 1, 100000))) / 100;
}

/**
 * Sets the range parameters based on the given ID, minimum, and maximum values.
 *
 * @param {string} id - The ID of the range parameter.
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @return {void} This function does not return a value.
 */
function setRangeParam(id, min, max) {
  switch (id) {
    case 'gpu-cnt':
      setRelevantGPU(min, max);
      break;
    case 'cpu-core':
      setRelevantCPU(min, max);
      break;
    case 'internet-up':
      setRelevantInternetUp(min, max);
      break;
    case 'internet-down':
      setRelevantInternetDown(min, max);
      break;
    case 'gpu-vram':
      setGPUVRAM(min, max);
      break;
    case 'ram':
      setRAM(min, max);
      break;
    case 'reliability':
      setReliability(min, max);
      break;
    case 'rental-length-slider':
      setRentalLength(max);
      break;
    default:
      break;
  }

  update_servers_list();
}

/**
 * Returns the thumb handlers for a given range ID.
 *
 * @param {string} rangeID - The ID of the range.
 * @return {Object} An object containing the thumb min and max handlers.
 */
function getThumbHandlers(rangeID) {
  let thumbMinHandler = null;
  let thumbMaxHandler = null;

  switch (rangeID) {
    case 'gpu-vram':
      thumbMinHandler = (value) => Math.round(logValue(value, 2, 128, 2, 1280));
      thumbMaxHandler = (value) => Math.round(logValue(value, 2, 128, 2, 1280));
      break;
    case 'ram':
      thumbMinHandler = (value) => Math.round(logValue(value, 1, 8192, 1, 10240));
      thumbMaxHandler = (value) => Math.round(logValue(value, 1, 8192, 1, 10240));
      break;
    case 'internet-down':
    case 'internet-up':
      thumbMinHandler = (value) => Math.round(logValue(value, 0, 10000, 1, 10001));
      thumbMaxHandler = (value) => Math.round(logValue(value, 0, 10000, 1, 10001));
      break;
    case 'cpu-core':
      thumbMinHandler = (value) => Math.round(logValue(value, 1, 512, 1, 4096));
      thumbMaxHandler = (value) => Math.round(logValue(value, 1, 512, 1, 4096));
      break;
    case 'reliability':
      thumbMaxHandler = (value) => {
        const inverseValue = 100000 - value;
        const normalizedValue = inverseValue < 5 ? 100 : inverseValue;
        const logNormalizedValue = logValue(normalizedValue, 1, 10000, 1, 100000);
        const reliabilityValue = 100 - Math.round(logNormalizedValue) / 100;

        return reliabilityValue.toFixed(2);
      };
    default:
      break;
  }

  return { thumbMinHandler, thumbMaxHandler };
}

/**
 * Initializes a range slider with the given parameters.
 *
 * @param {string} rangeID - The ID of the range slider element.
 * @param {Object} options - An object containing configuration options for the range slider.
 */
function initializeRange(rangeID, { min, max, step, minValue, maxValue, isSingle = false }) {
  const onChange = (minValue, maxValue) => setRangeParam(rangeID, minValue, maxValue);
  const rangeOptions = { isSingle, min, max, step, minValue, maxValue, onChange };
  const rangeElements = document.querySelectorAll(`[data-id="${rangeID}"]`);
  const { thumbMinHandler, thumbMaxHandler } = getThumbHandlers(rangeID);

  if (rangeElements) {
    rangeElements.forEach((rangeElement) => {
      new AeroRange(rangeElement, {
        ...rangeOptions,
        thumbMinHandler,
        thumbMaxHandler,
      });
    });
  } else {
    console.error(`Range slider ${rangeID} not found`);
  }
}

/**
 * Transforms GPU data into select data format.
 *
 * @param {object} gpuData - The GPU data to be transformed.
 * @param {string} selectedValue - The selected value.
 * @return {array} The transformed GPU data in select data format.
 */
function transformGPUDataToSelectData(gpuData, selectedValue) {
  const allOption = {
    value: 'any',
    label: 'All GPUs',
    selected: selectedValue.includes('any'),
  };

  const transformedData = Object.entries(gpuData).map(([key, value]) => ({
    value: `opt-${key}`,
    label: value.show_n,
    selected: selectedValue.includes(`opt-${key}`),
  }));

  return [allOption, ...transformedData];
}

/**
 * Transforms data into select data format.
 *
 * @param {array} data - The data to be transformed.
 * @param {string} selectedValue - The selected value.
 * @param {string} defaultLabel - The value for default label.
 * @param {string} defaultValue - The value for default value.
 * @param {boolean} isVer - If true - add (var).0.
 * @param {boolean} isMore - If true - add (var)+.
 * @param {boolean} isX - If true - add x(var).
 * @return {array} The transformed data in select data format.
 */
function transformDataToSelectData(data, selectedValue, defaultLabel, defaultValue, isVer = false, isMore = false, isX = false) {
  const allOption = {
    value: defaultValue,
    label: defaultLabel,
    selected: selectedValue === defaultValue,
  };

  const transformedData = data.map(value => {
    let label = value;

    if (isVer) {
      label += '.0'
    }

    if (isMore) {
      label += '+'
    }

    if (isX) {
      label = `x${label}`
    }

    return {
    value,
    label: label,
    selected: selectedValue === value,
    }
  });

  return [allOption, ...transformedData];
}

function transformDataToMultiSelectData(data, selectedValue, defaultLabel, defaultValue, isVer = false, isMore = false, isX = false) {
  const allOption = {
    value: defaultValue,
    label: defaultLabel,
    selected: selectedValue.includes(defaultValue),
  };

  const transformedData = data.map(value => {
    let label = value;

    if (isVer) {
      label += '.0'
    }

    if (isMore) {
      label += '+'
    }

    if (isX) {
      label = `x${label}`
    }

    return {
    value,
    label: label,
    selected: selectedValue.includes(value),
    }
  });

  return [allOption, ...transformedData];
}

/**
 * Initializes a select element with the specified options.
 *
 * @param {string} id - The ID of the select element.
 * @param {string} defaultValue - The default value for the select element.
 * @param {Object} options - An object containing additional data and an onChange function.
 */
function initializeSelect(id, defaultValue, { data, onChange }) {
  const options = { data, onChange, defaultValue };
  const selects = document.querySelectorAll(`[data-id="${id}"]`);

  if (selects) {
    selects.forEach((select) => {
      new AeroSelect(select, options);
    });
  } else {
    console.error(`Select ${id} not found`);
  }
}

/**
 * Initializes a select element with the specified options.
 *
 * @param {string} id - The ID of the select element.
 * @param {string} defaultValue - The default value for the select element.
 * @param {Object} options - An object containing additional data and an onChange function.
 */
function initializeMultiSelect(id, defaultValue, { data, onChange }) {
  const options = { data, onChange, defaultValue };
  const selects = document.querySelectorAll(`[data-id="${id}"]`);

  if (selects) {
    selects.forEach((select) => {
      new AeroMultiSelect(select, options);
    });
  } else {
    console.error(`Select ${id} not found`);
  }
}

// OC code
function first_enable_oc() {
  $('.so-alert-txt').html(`<span style="
    text-align: center;
    margin-left: auto;
    font-size: 21px;
    margin-top:5px;
    margin-right: auto;
">Do you really want to enable overclocking on your machine <b>${$('#si-cn').html()}</b>?</span><div class="flexbreak"></div>
<span style="margin-top:23px;font-weight:400;margin-left:9px;margin-right:9px;">Enabling overclocking will reboot your machine, it is not recommended to do this while your machine is rented, because you will interrupt your clients workload.<br><br>Overclocking is still in beta, enabling it might brick your operating system, use with caution.<br>
<br>
Will most likely brick operating system video output, be ready for it.</span>
<div class="flexbreak"></div><div class="oc-enable">
    <div class="oc-enable-btn oc-enable-custom" onclick="enable_oc()">
        <span style="position:relative;top:1px;">I understand, Enable</span>
    </div>
</div>`);
  // $('.show-sorder-alert').css('display', 'flex');
  showModalAlert();
}

async function enable_oc() {
  // $('.show-sorder-alert').css('display', 'none');
  hideModalAlert();
  let cerr = '';
  await call_api('enable_oc', {
    server_id: current_open_server_id,
  }).catch(function (err) {
    cerr = err;
  });
  if (cerr) {
    aero_modal_alert('market-alert', {text: 'connection error'})
  } else {
    location.reload();
  }
}

function validate_host_filter(item) {
  const value = $(`[data-id=${market_host_filter_id}]`).val()
  if (value.length) {
    return item === Number(value);
  }
  return true
}

function validate_rig_filter(item) {
  const value = $(`[data-id=${market_rig_filter_id}]`).val()
  if (value.length) {
    return item === Number(value);
  }
  return true
}

function set_show_in_usd() {
  show_in_usd = $('#usd-toggle').prop('checked')
  update_servers_list()
}

// OC code
// setTimeout(function () {
// }, 400);

async function rent_server_by_template(server_id) {
  let api_res;

  const server_rent_button = $(`#rent-button-${server_id}`);
  const server_spot_button = $(`#spot-button-${server_id}`);
  // const all_server_rent_buttons = $('.server-rent-button');

  // const disable_buttons = (buttons, condition = true) => {
  //   buttons.each(function() {
  //     if (server_rent_button.attr('id') !== this.id && this.innerText !== 'Rented') {
  //       $(this).toggleClass('aero-btn-secondary-disabled', condition);
  //     }
  //   });
  // };

  const reset_buttons_state_on_error = () => {
    server_rent_button.html(`<span>Rent</span>`).removeClass('aero-btn-secondary-disabled');
    server_spot_button.removeClass('aero-btn-secondary-disabled');
    // disable_buttons(all_server_rent_buttons, false);
  };

  const update_rent_button_state = (htmlContent, addClasses = '', removeClasses = '') => {
    server_rent_button.html(htmlContent)
    .addClass(addClasses)
    .removeClass(removeClasses);
  };

  const display_loading_state = () => {
    server_spot_button.addClass('aero-btn-primary-disabled');
    update_rent_button_state(
      `<svg class="fa-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21C14.3869 21 16.6761 20.0518 18.364 18.364C20.0518 16.6761 21 14.3869 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3M17 12C17 11.0111 16.7068 10.0444 16.1574 9.22215C15.6079 8.39991 14.8271 7.75904 13.9134 7.3806C12.9998 7.00217 11.9945 6.90315 11.0246 7.09608C10.0546 7.289 9.16373 7.76521 8.46447 8.46447C7.76521 9.16373 7.289 10.0546 7.09608 11.0246C6.90315 11.9945 7.00217 12.9998 7.3806 13.9134C7.75904 14.8271 8.39991 15.6079 9.22215 16.1574C10.0444 16.7068 11.0111 17 12 17" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      'aero-btn-secondary-disabled',
    );
    // disable_buttons(all_server_rent_buttons);
  };

  try {
    display_loading_state();

    const req_body = {
      ...selected_template,
      renting_server: server_id,
      type: 'on-demand',
      currency: market_currency,
      ports: selected_template['forwarding'] ?? {},
      required_price: relevant_server_info[server_id]['price']['on_demand'][market_currency],
      env: selected_template['preset_env'],
    };

    delete req_body.preset_env;
    delete req_body.forwarding;

    api_res = await call_api('create_order', req_body);
  } catch (error) {
    reset_buttons_state_on_error();
    display_rent_server_by_template_result('Connection error');
    return;
  }

  // Handle different API error responses
  const ERROR_MAPPING = {
    'reached_order_limit': 'You have reached your order limit',
    'reached_order_limit_per_day': `You have reached your daily order limit - (${api_res.limit} orders/day)`,
    'server-already-rented': 'This server is already rented',
    'server-dont-exist': 'This server is not available',
    'server-offline': 'This server is not available',
    'not_enough_balance': 'You don\'t have enough balance to create order',
    'wait': 'Try again a bit later',
    'compute-not-available': 'Not enough capacity is available in our datacenter to deploy your instance, please try again later',
  };

  if (api_res?.error) {
    reset_buttons_state_on_error();
    if (api_res.error !== 'wait') {
      display_rent_server_by_template_result(ERROR_MAPPING[api_res.error] || 'Something went wrong');
    }
  } else {

    update_rent_button_state(
      `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12L11 15L16 9M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      'aero-btn-secondary-success',
      'aero-btn-secondary-disabled',
    );
    // disable_buttons(all_server_rent_buttons, false);

    setTimeout(() => {
      update_rent_button_state(`<span>Rented</span>`, 'aero-btn-secondary-disabled', 'aero-btn-secondary-success');
    }, 3000);
  }
}

// Display the result of the rent operation in a modal
function display_rent_server_by_template_result(errorText) {
  const rent_result_modal = new AeroModal("template-rent-result", {
    closeCallback: () => {
      $('#template-rent-result-text').text('');
    }
  });
  $('#template-rent-result-text').text(errorText);
  rent_result_modal.openModal();
}

function mass_onboard(){
  let mass_onboard_modal = new AeroModal('mass-onboarding-container-aero');
  document.getElementById("mo-od-btc").value = ''
  document.getElementById("mo-spot-btc").value = ''
  document.getElementById("mo-od-CLORE-Blockchain").value = ''
  document.getElementById("mo-spot-CLORE-Blockchain").value = ''
  document.getElementById("mass-multiplier-od").value = 1.8
  document.getElementById("mass-multiplier-spot").value = 1.4
  document.getElementById("mass-onboarding-max-length").value = 12

  mass_onboarding_price_alert()
  mass_onboarding_multiplier_alert()

  $("#mo-od-CLORE-Blockchain").removeClass("price-input-correct")
  $("#mo-spot-CLORE-Blockchain").removeClass("price-input-correct")
  $("#mo-od-btc").removeClass("price-input-correct")
  $("#mo-spot-btc").removeClass("price-input-correct")
  $("#mass-multiplier-spot").removeClass("price-input-wrong")
  $("#mass-multiplier-od").removeClass("price-input-wrong")
  $("#mass-onboarding-max-length").removeClass("price-input-wrong")

  $("#mo-od-CLORE-Blockchain").addClass("price-input-wrong")
  $("#mo-spot-CLORE-Blockchain").addClass("price-input-wrong")
  $("#mo-od-btc").addClass("price-input-wrong")
  $("#mo-spot-btc").addClass("price-input-wrong")
  $("#mass-multiplier-spot").addClass("price-input-correct")
  $("#mass-multiplier-od").addClass("price-input-correct")
  $("#mass-onboarding-max-length").addClass("price-input-correct")

  $(".mass-onboard-pricing-model-title").css("display","none")
  $(".mass-onboard-pricing-models").css("display","none")
  $(".mass-onboard-config-title").css("display", "none")
  $(".mass-onboard-enable-override").css("display", "none")
  $(".mass-onboard-enable-oc-update").css("display", "none")
  $(".mass-onboard-configure-multipliers").css("display", "none")
  $(".mass-onboard-keep").css("display", "none")
  
  handle_mrl_mass_onboarding()
  select_mass_onboard_platform()

  mass_onboard_modal.openModal()
}

let mass_onboard_selected_platform = ''
function select_mass_onboard_platform(id) {
  mass_onboard_selected_platform=id
  const buttons = document.querySelectorAll('.mass-onboard-platforms button');
  buttons.forEach(button => button.classList.remove('active_platform_select'));
  select_mass_onboard_pricing_model()
  if(document.getElementById(id)){
    $(".mass-onboard-pricing-models").html(`<button id="static" onclick="select_mass_onboard_pricing_model('static')"${id=='hiveos'?'':' style="width:100%;"'}>Static</button>
${id=='hiveos'?`<button id="pow" onclick="select_mass_onboard_pricing_model('pow')">Mining Profitability Based</button>`:``}`)
    $(".mass-onboard-pricing-model-title").css("display", "flex")
    $(".mass-onboard-pricing-models").css("display", "flex")
    document.getElementById(id).classList.add('active_platform_select');
  }
}
var last_onboarding_pricing_model = ''
function select_mass_onboard_pricing_model(id){
  last_onboarding_pricing_model=id
  const buttons = document.querySelectorAll('.mass-onboard-pricing-models button');
  document.getElementById("mass-onboarding-usd-pricing-checkbox").checked = false
  document.getElementById("onboard-rs-od-usd").value = 20
  document.getElementById("onboard-rs-spot-usd").value = 10
  $(`#onboard-rs-od-usd`).addClass("price-input-correct")
  $(`#onboard-rs-spot-usd`).addClass("price-input-correct")
  $(`#onboard-rs-od-usd`).removeClass("price-input-wrong")
  $(`#onboard-rs-spot-usd`).removeClass("price-input-wrong")
  $(".onboard-prices-usd_inputs_container").addClass("hide")
  buttons.forEach(button => button.classList.remove('active_platform_select'));
  if(document.getElementById(id)){
    if(id=="static"){
      $(".mass-onboard-configure-pricing").css("display", "flex")
      $(".mass-onboard-config-title").css("display", "flex")
      $(".mass-onboard-enable-override").css("display", "flex")
      $(".mass-onboard-configure-multipliers").css("display", "none")
    }else if(id=="pow"){
      $(".mass-onboard-configure-pricing").css("display", "none")
      $(".mass-onboard-configure-multipliers").css("display", "flex")
      $(".mass-onboard-config-title").css("display", "flex")
      $(".mass-onboard-enable-override").css("display", "flex")
    }
    $(".mass-onboard-enable-oc-update").css("display", mass_onboard_selected_platform=="hiveos"?"flex":"none")
    $(".mass-onboard-keep").css("display", mass_onboard_selected_platform=="hiveos"?"flex":"none")
    $(".mass-onboarding-mrl-settings").css("display", "flex")
    document.getElementById(id).classList.add('active_platform_select');
  }else{
    $(".mass-onboard-configure-pricing").css("display", "none")
    $(".mass-onboard-configure-multipliers").css("display", "none")
    $(".mass-onboard-config-title").css("display", "none")
    $(".mass-onboard-enable-override").css("display", "none")
    $(".mass-onboard-enable-oc-update").css("display", "none")
    $(".mass-onboard-keep").css("display", "none")
    $(".mass-onboarding-mrl-settings").css("display", "none")
  }
  generate_mass_onboarding_config()
}

function mass_onboarding_price_alert(html){
  $(".mass-onboard-pricing-alert").css("display",html?"flex":"none")
  if (html) $(".mass-onboarding-pricing-alert-text span").html(html)
}

function mass_onboarding_multiplier_alert(html){
  $(".mass-onboard-multiplier-alert").css("display",html?"flex":"none")
  if (html) $(".mass-onboarding-multiplier-alert-text span").html(html)
}

let mass_onboarding_price_inputs = [["mo-od-btc", "Bitcoin"], ["mo-spot-btc", "Bitcoin"], ["mo-od-CLORE-Blockchain", "CLORE Blockchain"], ["mo-spot-CLORE-Blockchain", "CLORE Blockchain"]]
function validate_mass_onboard_pricing(obj, show_name, no_hide){
  let object = document.getElementById(obj)
  let min = parseFloat(object.min), max = parseFloat(object.max), step = object.step, value = object.value
  let allowed_decimals = step.includes('.') ? step.split('.')[1].length : Infinity

  let value_decimals = value.includes('.') ? value.split('.')[1].length : 0

  if(!no_hide) {
    mass_onboarding_price_alert()
    let any_not_matched = false
    mass_onboarding_price_inputs.forEach(aa => {
      let obj_id = aa[0], currency = aa[1]
      if(obj_id!=obj){
        if(validate_mass_onboard_pricing(obj_id, currency, true)) any_not_matched=true
      }
    })
  }

  if(value < min || value > max){
    mass_onboarding_price_alert(`${show_name} price must be in range <b>${min} - ${max}</b>`)
    $(`#${obj}`).removeClass("price-input-correct")
    $(`#${obj}`).addClass("price-input-wrong")
  }else if(value_decimals>allowed_decimals && show_name){
    mass_onboarding_price_alert(`${show_name} price must have up to <b>${allowed_decimals}</b> decimal points`)
    $(`#${obj}`).removeClass("price-input-correct")
    $(`#${obj}`).addClass("price-input-wrong")
  }else{
    $(`#${obj}`).removeClass("price-input-wrong")
    $(`#${obj}`).addClass("price-input-correct")
    return true
  }
  return false
}
let mass_onboarding_multipliers_inputs = [["mass-multiplier-od", ""], ["mass-multiplier-spot", ""]]
function validate_mass_onboard_multipliers(obj, no_hide){
  let object = document.getElementById(obj)
  let min = parseFloat(object.min), max = parseFloat(object.max), step = object.step, value = object.value
  let allowed_decimals = 2

  let value_decimals = value.includes('.') ? value.split('.')[1].length : 0

  if (!no_hide) {
    mass_onboarding_multiplier_alert()
    let any_not_matched = false
    mass_onboarding_multipliers_inputs.forEach(aa => {
      let obj_id = aa[0], currency = aa[1]
      if (obj_id != obj) {
        if (validate_mass_onboard_multipliers(obj_id, true)) any_not_matched = true
      }
    })
  }

  if(value < min || value > max){
    mass_onboarding_multiplier_alert(`${obj.includes('-spot')?`SPOT`:`On demand`} multiplier must be in range <b>${min} - ${max}</b>`)
    $(`#${obj}`).removeClass("price-input-correct")
    $(`#${obj}`).addClass("price-input-wrong")
  }else if(value_decimals>allowed_decimals){
    mass_onboarding_multiplier_alert(`${obj.includes('-spot')?`SPOT`:`On demand`} multiplier must have up to <b>${allowed_decimals}</b> decimal points`)
    $(`#${obj}`).removeClass("price-input-correct")
    $(`#${obj}`).addClass("price-input-wrong")
  }else{
    $(`#${obj}`).removeClass("price-input-wrong")
    $(`#${obj}`).addClass("price-input-correct")
    return true
  }
  return false
}
function handle_mrl_mass_onboarding(){
  let mrl_value_obj = document.getElementById("mass-onboarding-max-length")
  mrl_value_obj.value = mrl_value_obj.value.replace(/\./g,'')
  let value = parseFloat(mrl_value_obj.value), min = mrl_value_obj.min, max = mrl_value_obj.max
  if (value < min || value > max){
    $(".mass-onboard-mrl-alert span").html(`Maximum rental length can be in range <b>${min} - ${max}</b> hours`)
    $(".mass-onboard-mrl-alert").css("display", "flex")

    $("#mass-onboarding-max-length").removeClass("price-input-correct")
    $("#mass-onboarding-max-length").addClass("price-input-wrong")
  }else{
    $("#mass-onboarding-max-length").removeClass("price-input-wrong")
    $("#mass-onboarding-max-length").addClass("price-input-correct")
    $(".mass-onboard-mrl-alert").css("display", "none")
  }
  generate_mass_onboarding_config()
}
function mass_onboard_enable_override_check(event){
  if (event.target.type === 'checkbox') {
    event.stopPropagation(); // Stop the event from bubbling up
  }else{
    document.getElementById("mass-onboard-enable-overrice-input").checked = !document.getElementById("mass-onboard-enable-overrice-input").checked
  }
  $(".mass-onboard-enable-override").css("background-color", document.getElementById("mass-onboard-enable-overrice-input").checked?"#080":"var(--aero-gray20)")
  generate_mass_onboarding_config()
}

function mass_onboard_enable_oc_update_check(event){
  if (event.target.type === 'checkbox') {
    event.stopPropagation(); // Stop the event from bubbling up
  }else{
    document.getElementById("mass-onboard-enable-oc-update-input").checked = !document.getElementById("mass-onboard-enable-oc-update-input").checked
  }
  $(".mass-onboard-enable-oc-update").css("background-color", document.getElementById("mass-onboard-enable-oc-update-input").checked?"#080":"var(--aero-gray20)")
  generate_mass_onboarding_config()
}

function mass_onboard_keep_check(event) {
  if (event.target.type === 'checkbox') {
    event.stopPropagation(); // Stop the event from bubbling up
  } else {
    document.getElementById("mass-onboard-keep-input").checked = !document.getElementById("mass-onboard-keep-input").checked
  }
  $(".mass-onboard-keep").css("background-color", document.getElementById("mass-onboard-keep-input").checked ? "#080" : "var(--aero-gray20)")
  generate_mass_onboarding_config()
}

function generate_mass_onboarding_config(){
  let onboarding_config = {
    "auth": mass_onboarding_auth,
    "mrl": parseInt(document.getElementById("mass-onboarding-max-length").value)
  }, any_input_data_invalid = false
  if($(".mass-onboard-configure-multipliers").css("display")=="flex"){
    onboarding_config["autoprice"] = {
      "on_demand_multiplier": parseFloat(document.getElementById("mass-multiplier-od").value),
      "spot_multiplier": parseFloat(document.getElementById("mass-multiplier-spot").value)
    }
    if(!validate_mass_onboard_multipliers("mass-multiplier-spot") || !validate_mass_onboard_multipliers("mass-multiplier-od")){
      any_input_data_invalid = true
    }
  }else if($(".mass-onboard-configure-pricing").css("display")=="flex"){
    if($(".mass-onboard-pricing-alert").css("display")=="flex") any_input_data_invalid = true
    if(document.getElementById("mass-onboarding-usd-pricing-checkbox").checked){
      onboarding_config["autoprice"] = {
        "usd": true,
        "on_demand": parseFloat(document.getElementById("onboard-rs-od-usd").value),
        "spot": parseFloat(document.getElementById("onboard-rs-spot-usd").value)
      }
    }else{
      onboarding_config["on_demand_bitcoin"] = parseFloat(document.getElementById("mo-od-btc").value)
      onboarding_config["on_demand_clore"] = parseFloat(document.getElementById("mo-od-CLORE-Blockchain").value)
      onboarding_config["spot_bitcoin"] = parseFloat(document.getElementById("mo-spot-btc").value)
      onboarding_config["spot_clore"] = parseFloat(document.getElementById("mo-spot-CLORE-Blockchain").value)
      if (!onboarding_config["on_demand_bitcoin"] || !onboarding_config["on_demand_clore"] || !onboarding_config["spot_bitcoin"] || !onboarding_config["spot_clore"]) any_input_data_invalid=true
    }
  }
  if(!document.getElementById("mass-onboard-enable-overrice-input").checked) onboarding_config["keep_params"]=true
  if(document.getElementById("mass-onboard-enable-oc-update-input").checked && mass_onboard_selected_platform=="hiveos") onboarding_config["set_stock_oc"]=true
  if(document.getElementById("mass-onboard-keep-input").checked && mass_onboard_selected_platform=="hiveos") onboarding_config["save_config"]=true
  let base64_config = btoa(JSON.stringify(onboarding_config)).replace(/\=/g, '')
  if(any_input_data_invalid || !mass_onboard_selected_platform || !last_onboarding_pricing_model){
    $(".mass-onboarding-bottom-data-parent").css("display", "none")
  }else{
    $(".mass-onboarding-bottom-data-parent").css("display", "flex")
    $(".mass-onboarding-fs").css("display", mass_onboard_selected_platform=="hiveos"?"initial":"none")
    $(".mass-onboarding-token").css("width", mass_onboard_selected_platform=="hiveos"?"calc(50% - 5px)":"100%")
    $(".mass-onboarding-token").css("margin-left", mass_onboard_selected_platform=="hiveos"?"10px":"0")
    $("#mass-onboard-txt1").text(`{"isFavorite":false,"items":[{"coin":"clore-hosting","pool_ssl":false,"wal_id":0,"dpool_ssl":false,"miner":"custom","miner_alt":"clore","miner_config":{"url":"stratum+tcp://placeholder.clore.ai:666","miner":"clore","template":"%WAL%","install_url":"https://documents.clore.ai/clore-007.tar.gz"},"pool_geo":[]}]} `)
    $("#mass-onboard-txt2").text(base64_config)
  }
}

let mass_prices_changes = {}, servers_by_gpu = [], mass_price_modal = null, new_gpu_prices_modal = null;

function mass_price_change_button() {
  if (!mass_price_change_enabled) return;
  mass_price_modal = new AeroModal('mass-price-modal', {
    closeCallback: () => {
      setTimeout(() => $('#mass-price-gpu-list').html(''), 150);
    },
  });

  const groupBy = (array, key) => {
    return array.reduce((acc, object) => {
      const property = key.split('.').reduce((prev, curr) => prev?.[curr], object);
      (acc[property] = acc[property] || []).push(object);
      return acc;
    }, {});
  };

  const normalized_servers = glob_ms.map(server => ({
    ...server,
    specs: {
      ...server.specs,
      // normalizing gpu name
      gpu: server.specs?.gpu?.replace(/NVIDIA\s*|GeForce\s*|^\d+x\s/g, ''),
    },
  }))
  // removing server if it has no gpu and has mixed gpus and has oc_gpus field
  .filter(server => server.mass_price_changeable);

  // grouping servers by gpu name example: { '6x RTX 3070': [ { id: 1 }, { id: 2} ], ... }
  servers_by_gpu = groupBy(normalized_servers, 'specs.gpu');

  Object.keys(servers_by_gpu).forEach(gpu => {
    mass_prices_changes[gpu] = {
      // is_dirty: false,
      autoprice: '',
      usd_pricing: {
        on_demand: usd_min_pricing_limit,
        spot: usd_min_pricing_limit,
      },
      pricing: {
        'CLORE-Blockchain': clore_min_pricing_limit,
        bitcoin: bitcoin_min_pricing_limit,
      },
      spot_pricing: {
        bitcoin: bitcoin_min_pricing_limit,
        'CLORE-Blockchain': clore_min_pricing_limit,
      }
    };
  });

  render_mass_price_gpu_list();
  init_gpu_click_listeners();

  mass_price_modal.openModal();
}

function init_gpu_click_listeners() {
  $('details').click(function (event) {
    $('details').not(this).removeAttr('open');
  });
}

function render_mass_price_gpu_list() {
  let gpu_list_html = '';

  servers_by_gpu && Object.keys(servers_by_gpu).length > 0 ? Object.keys(servers_by_gpu).forEach(gpu => {
    const is_usd_autoprice = server_usd_pricing_enabled && mass_prices_changes[gpu].autoprice === 'usd';
    const gpu_class = gpu.replace(/\s/g, '-');
    gpu_list_html +=
      `<div class="gpu-prices">
          <details class="accordion-wrapper">
              <summary class="gpu-prices-title">
                  <p class="aero-b3">${gpu}</p>
                  <div class="gpu-servers-count">
                    <span class="aero-caption">Associated with ${servers_by_gpu[gpu].length} server${servers_by_gpu[gpu].length > 1 ? 's' : ''}</span>
                  </div>
              </summary>
              <div class="gpu-prices-extra-info">
                <div class="a-rental-form-box full-with">
                 ${server_usd_pricing_enabled ? `<div class="rs-prices-usd_box">
                    <div class="rs-prices-usd_content">
                      <label class="a-checkbox">
                        <input type="checkbox" id="${gpu_class}-usd-enable-checkbox" class="${gpu_class}-is-usd-prices" name="is-usd-prices" onchange="handle_mass_price_usd_autoprice(event, '${gpu}')" ${is_usd_autoprice ? ` checked="checked"` : ``}>
                      </label>
                      <span class="aero-b4 aero-b4_gray">
                          Calculate based on USD
                      </span>
                    </div>
                     <div class="${gpu_class}-rs-prices-usd_inputs_container ${is_usd_autoprice ? '' : 'hide'}">
                        <div class="aero-input-wrapper" id="is_usd_prices_input_od">
                          <div class="aero-input-sign">
                            On demand pricing
                          </div>
                          <input id="${gpu_class}-rs-od-usd" type="number" class="aero-input rs-prices-usd_input_full" 
                              value="${mass_prices_changes[gpu].usd_pricing.on_demand || usd_min_pricing_limit}" min="${usd_min_pricing_limit}" max="${usd_max_pricing_limit}" 
                              step="0.01" onblur="handle_gpu_mass_price_usd_inputs('${gpu_class}-rs-od-usd', '${gpu_class}-rs-od-btc', '${gpu_class}-rs-od-CLORE-Blockchain', '${gpu}')"
                          >
                          <div class="aero-input-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round"
                                    d="M17 6h-5M7 18h5m0-12H9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3m0-12V4m0 2v12m0 0v2"/>
                            </svg>
                          </div>
                        </div>
                        <div class="aero-input-wrapper" id="is_usd_prices_input_spot">
                          <div class="aero-input-sign">Minimal spot price</div>
                          <input id="${gpu_class}-rs-spot-usd" type="number" class="aero-input rs-prices-usd_input_full" 
                              value="${mass_prices_changes[gpu].usd_pricing.spot || usd_min_pricing_limit}" min="${usd_min_pricing_limit}" max="${usd_max_pricing_limit}" step="0.01"
                              onblur="handle_gpu_mass_price_usd_inputs('${gpu_class}-rs-spot-usd', '${gpu_class}-rs-spot-btc', '${gpu_class}-rs-spot-CLORE-Blockchain', '${gpu}')"
                          >
                          <div class="aero-input-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round"
                                    d="M17 6h-5M7 18h5m0-12H9a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h6a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3m0-12V4m0 2v12m0 0v2"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                   </div>` : ``}
                </div>
                <div class="rental-settings-enable-coins noselect">
                  <div class="rental-settings-enable-coin">
                    <label class="a-checkbox">
                      <input onchange='set_dirty_mass_price_state("${gpu}", true)' type="checkbox" id="${gpu_class}-btc-enable-checkbox" name="on-demand-pricing-btc" checked="checked">
                    </label>
                    <span onclick='document.getElementById("${gpu_class}-btc-enable-checkbox").click()'>Enable BTC payments</span>
                  </div>
                  <div class="rental-settings-enable-coin">
                    <label class="a-checkbox">
                      <input onchange='set_dirty_mass_price_state("${gpu}", true)' type="checkbox" id="${gpu_class}-CLORE-Blockchain-enable-checkbox" checked="checked">
                    </label>
                    <span onclick='document.getElementById("${gpu_class}-CLORE-Blockchain-enable-checkbox").click()'>Enable CLORE payments</span>
                  </div>
                </div>
                <div class="price-inputs-wrapper">
                  <div class="a-rental-form-box">
                    <div class="aero-input-wrapper">
                      <div class="aero-input-sign">
                        On demand pricing (BTC)
                      </div>
                      <input id="${gpu_class}-rs-od-btc" type="number" class="aero-input ${is_usd_autoprice ? 'aero-input_disabled' : ''}" value="${mass_prices_changes[gpu]['pricing']['bitcoin'].toFixed(8)}" min="${bitcoin_min_pricing_limit}" max="${bitcoin_max_pricing_limit}"
                        step="0.00000001" onblur="handle_mass_od_universal('${gpu_class}-rs-od-btc', ${bitcoin_min_pricing_limit}, ${bitcoin_max_pricing_limit}, 8, '${gpu}')" ${is_usd_autoprice ? ` disabled` : ``}>
                      <div class="aero-input-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 25">
                          <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".6"
                            stroke-width="1.5"
                            d="M6 6.5h8a3 3 0 0 1 0 6m0 0a3 3 0 0 1 0 6H6m8-6H8m0-6v12m1-15v3m4-3v3m-4 12v3m4-3v3" />
                        </svg>
                      </div>
                    </div>
                    <div class="aero-input-wrapper">
                      <div class="aero-input-sign">Minimal spot price (BTC)</div>
                      <input id="${gpu_class}-rs-spot-btc" type="number" class="aero-input ${is_usd_autoprice ? 'aero-input_disabled' : ''}" value="${mass_prices_changes[gpu]['spot_pricing']['bitcoin'].toFixed(8)}" min="${bitcoin_min_pricing_limit}" max="${bitcoin_max_pricing_limit}"
                        step="0.00000001" onblur="handle_mass_od_universal('${gpu_class}-rs-spot-btc', ${bitcoin_min_pricing_limit}, ${bitcoin_max_pricing_limit}, 8, '${gpu}')" ${is_usd_autoprice ? ` disabled` : ``}>
                      <div class="aero-input-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 25">
                          <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-opacity=".6"
                            stroke-width="1.5"
                            d="M6 6.5h8a3 3 0 0 1 0 6m0 0a3 3 0 0 1 0 6H6m8-6H8m0-6v12m1-15v3m4-3v3m-4 12v3m4-3v3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="a-rental-form-box">
                    <div class="aero-input-wrapper">
                      <div class="aero-input-sign">
                        On demand pricing (CLORE)
                      </div>
                      <input id="${gpu_class}-rs-od-CLORE-Blockchain" type="number" class="aero-input ${is_usd_autoprice ? 'aero-input_disabled' : ''}" value="${(mass_prices_changes[gpu]['pricing']['CLORE-Blockchain'] || clore_min_pricing_limit).toFixed(2)}" min="${clore_min_pricing_limit}" max="${clore_max_pricing_limit}"
                        step="0.01" onblur="handle_mass_od_universal('${gpu_class}-rs-od-CLORE-Blockchain', ${clore_min_pricing_limit}, ${clore_max_pricing_limit}, 2, '${gpu}');set_dirty_mass_price_state('${gpu}', true)" ${is_usd_autoprice ? ` disabled` : ``}>
                      <div class="aero-input-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 25">
                          <path fill="#fff" fill-opacity=".6"
                            d="M17 4.014c-1.453-.946-2.724-1.388-4.66-1.514-1.817 1.766-1.756 5.36 0 7 .726-3.027 2.42-4.667 4.66-5.486ZM19.517 5.504C16.414 5.378 14 7.971 14 10.5c2.552-1.58 5.517-1.644 8-.38-.414-2.023-1.197-3.09-2.483-4.616ZM22 12.799c-1.782-1.832-5.282-1.649-7 .061 2.806.654 4.327 1.893 5.6 4.64.972-1.539 1.4-2.686 1.4-4.701ZM19 19.948c-.19-3.31-2.25-5.257-5-5.448 1.423 2.713 1.709 5.241.443 8 1.89-.564 2.975-1.103 4.557-2.552ZM11.643 22.5c1.749-1.829 1.87-4.793 0-7-.724 3.09-2.291 4.667-4.643 5.55 1.62 1.033 2.671 1.266 4.643 1.45ZM4.353 19.5C7.173 19.227 9 17.312 9 14.5c-1.75 1.438-4.707 1.625-7 .563.64 1.941 1.15 2.956 2.353 4.437ZM2.001 12.15c1.59 1.674 4.9 1.922 6.999 0-2.99-.682-4.742-2.4-5.536-4.65-.89 1.302-1.491 3.1-1.463 4.65ZM5 5.12c.443 3.311 2.089 5.104 5 5.38-1.47-2.648-1.582-5.172-.506-8C7.405 3.052 6.3 3.812 5 5.12Z" />
                        </svg>
                      </div>
                    </div>
                    <div class="aero-input-wrapper">
                      <div class="aero-input-sign">Minimal spot price (CLORE)</div>
                      <input id="${gpu_class}-rs-spot-CLORE-Blockchain" type="number" class="aero-input ${is_usd_autoprice ? 'aero-input_disabled' : ''}" value="${(mass_prices_changes[gpu]['spot_pricing']['CLORE-Blockchain'] || clore_min_pricing_limit).toFixed(2)}" min="${clore_min_pricing_limit}" max="${clore_max_pricing_limit}"
                        step="0.01" onblur="handle_mass_od_universal('${gpu_class}-rs-spot-CLORE-Blockchain', ${clore_min_pricing_limit}, ${clore_max_pricing_limit}, 2, '${gpu}');set_dirty_mass_price_state('${gpu}', true);" ${is_usd_autoprice ? ` disabled` : ``}>
                      <div class="aero-input-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 25">
                          <path fill="#fff" fill-opacity=".6"
                            d="M17 4.014c-1.453-.946-2.724-1.388-4.66-1.514-1.817 1.766-1.756 5.36 0 7 .726-3.027 2.42-4.667 4.66-5.486ZM19.517 5.504C16.414 5.378 14 7.971 14 10.5c2.552-1.58 5.517-1.644 8-.38-.414-2.023-1.197-3.09-2.483-4.616ZM22 12.799c-1.782-1.832-5.282-1.649-7 .061 2.806.654 4.327 1.893 5.6 4.64.972-1.539 1.4-2.686 1.4-4.701ZM19 19.948c-.19-3.31-2.25-5.257-5-5.448 1.423 2.713 1.709 5.241.443 8 1.89-.564 2.975-1.103 4.557-2.552ZM11.643 22.5c1.749-1.829 1.87-4.793 0-7-.724 3.09-2.291 4.667-4.643 5.55 1.62 1.033 2.671 1.266 4.643 1.45ZM4.353 19.5C7.173 19.227 9 17.312 9 14.5c-1.75 1.438-4.707 1.625-7 .563.64 1.941 1.15 2.956 2.353 4.437ZM2.001 12.15c1.59 1.674 4.9 1.922 6.999 0-2.99-.682-4.742-2.4-5.536-4.65-.89 1.302-1.491 3.1-1.463 4.65ZM5 5.12c.443 3.311 2.089 5.104 5 5.38-1.47-2.648-1.582-5.172-.506-8C7.405 3.052 6.3 3.812 5 5.12Z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="gpu-prices-apply">
                    <div id="${gpu_class}-apply-gpu-prices" type="button" class="aero-btn-primary gpu-prices-apply-button aero-btn-primary-v2" onclick="show_new_gpu_prices('${gpu}')">
                        <button>Apply</button>
                    </div>
                </div>
              </div>
          </details>
      </div>
    `;
  }) : gpu_list_html = `There are no servers for which you can change the price by GPU.`;

  $('#mass-price-gpu-list').html(gpu_list_html);
}

function handle_mass_price_usd_autoprice(event, gpu) {
  const gpu_class = gpu.replace(/\s/g, '-');
  const is_checked = event.target.checked;

  // Set dirty flag and enable apply button
  // set_dirty_mass_price_state(gpu, true);

  mass_prices_changes[gpu]['autoprice'] = is_checked ? 'usd' : '';

  toggle_usd_inputs_container(gpu_class, is_checked);
  toggle_input_fields(gpu_class, is_checked, ['od', 'spot'], ['btc', 'CLORE-Blockchain']);

  if (is_checked) {
    handle_gpu_mass_price_usd_inputs(`${gpu_class}-rs-od-usd`, `${gpu_class}-rs-od-btc`, `${gpu_class}-rs-od-CLORE-Blockchain`, gpu);
    handle_gpu_mass_price_usd_inputs(`${gpu_class}-rs-spot-usd`, `${gpu_class}-rs-spot-btc`, `${gpu_class}-rs-spot-CLORE-Blockchain`, gpu);
  }
}

function toggle_usd_inputs_container(gpu_class, is_checked) {
  $(`.${gpu_class}-rs-prices-usd_inputs_container`).toggleClass('hide', !is_checked);
}

function toggle_input_fields(gpu_class, is_checked, types, currencies) {
  $('.price-inputs-wrapper').find('.aero-input-sign').css('opacity', is_checked ? '0.4333' : '1');
  types.forEach(type => {
    currencies.forEach(currency => {
      const selector = `#${gpu_class}-rs-${type}-${currency}`;
      $(selector).toggleClass('aero-input_disabled', is_checked).prop('disabled', is_checked);
    });
  });
}

function handle_mass_od_universal(obj_id, min, max, decimals, gpu) {
  let value = document.getElementById(obj_id).value;
  value = clampValue(value, min, max);

  try {
    document.getElementById(obj_id).value = formatDecimal(value, decimals);
  } catch (error) {
    console.error(error);
  }

  // set_dirty_mass_price_state(gpu, true);
}

function clampValue(value, min, max) {
  return value < min && value !== 0 ? min : value > max ? max : value;
}

function formatDecimal(value, decimals) {
  const decimal_length = value.toString().includes('.')
    ? value.toString().split('.')[1].length
    : 0;

  return decimal_length > decimals ? parseFloat(value).toFixed(decimals) : value;
}

function handle_gpu_mass_price_usd_inputs(usd_input_id, btc_input_id, clore_input_id, gpu) {
  const $btc_input = document.getElementById(btc_input_id);
  const $clore_input = document.getElementById(clore_input_id);
  const $usd_input = document.getElementById(usd_input_id);

  const min_usd = 0.2;
  const max_usd = 200;

  let usd = $usd_input.value;

  usd = usd < min_usd ? min_usd : usd > max_usd ? max_usd : usd;

  $usd_input.value = usd;

  const new_btc = convert_usd_into_coins('bitcoin', usd);
  const new_clore = convert_usd_into_coins('CLORE-Blockchain', usd);

  $btc_input.value = new_btc;
  $clore_input.value = new_clore;

  update_mass_prices(gpu, usd_input_id, usd, new_btc, new_clore);

  // reset dirty flag and disable apply button
  // set_dirty_mass_price_state(gpu, true);
}

function update_mass_prices(gpu, usd_input_id, usd, new_btc, new_clore) {
  const is_on_demand = usd_input_id.includes('rs-od');

  const usd_pricing_key = is_on_demand ? 'on_demand' : 'spot';
  const pricing_key = is_on_demand ? 'pricing' : 'spot_pricing';

  mass_prices_changes[gpu]['usd_pricing'] = {
    ...mass_prices_changes[gpu]['usd_pricing'],
    [usd_pricing_key]: +usd,
  };

  mass_prices_changes[gpu][pricing_key] = {
    'CLORE-Blockchain': +new_clore,
    bitcoin: +new_btc,
  };
}

function close_new_gpu_prices_modal() {
  new_gpu_prices_modal.closeModal();
}

async function show_new_gpu_prices(gpu) {
  const gpu_class = gpu.replace(/\s/g, '-');

  if (!mass_price_change_enabled) return;

  new_gpu_prices_modal = new AeroModal('new-gpu-prices-modal', {
    closeCallback: () => {
      setTimeout(() => $('#new-gpu-prices-list').html(''), 150);
    },
  });

  let new_gpu_prices_html = '';

  const elements = {
    usd_checkbox: document.getElementById(`${gpu_class}-usd-enable-checkbox`),
    btc_checkbox: document.getElementById(`${gpu_class}-btc-enable-checkbox`),
    clore_checkbox: document.getElementById(`${gpu_class}-CLORE-Blockchain-enable-checkbox`),
    od_usd_input: document.getElementById(`${gpu_class}-rs-od-usd`),
    spot_usd_input: document.getElementById(`${gpu_class}-rs-spot-usd`),
    od_btc_input: document.getElementById(`${gpu_class}-rs-od-btc`),
    spot_btc_input: document.getElementById(`${gpu_class}-rs-spot-btc`),
    od_clore_input: document.getElementById(`${gpu_class}-rs-od-CLORE-Blockchain`),
    spot_clore_input: document.getElementById(`${gpu_class}-rs-spot-CLORE-Blockchain`),
  };

  const usd_defaults = {
    on_demand: 0.2,
    spot: 0.15,
    is_autoprice_enabled: false,
  };

  if (elements.usd_checkbox && elements.usd_checkbox.checked) {
    usd_defaults.is_autoprice_enabled = true;
    usd_defaults.on_demand = parseFloat(elements.od_usd_input.value);
    usd_defaults.spot = parseFloat(elements.spot_usd_input.value);
  }

  const is_enabled = (checkbox) => checkbox ? checkbox.checked : false;

  let request_body = {
    gpu,
    servers: servers_by_gpu[gpu].map(server => ({ id: server.id, gpu_count: server.gpu_count })),
    on_demand: parseFloat(elements.od_btc_input.value),
    spot: parseFloat(elements.spot_btc_input.value),
    'enabled-usd': is_enabled(elements.usd_checkbox),
    'enabled-btc': is_enabled(elements.btc_checkbox),
    ...(usd_defaults.is_autoprice_enabled && {
      autoprice: 'usd',
      usd_on_demand: usd_defaults.on_demand,
      usd_spot: usd_defaults.spot,
    }),
  }, cerr = '';

  if (elements.od_clore_input && elements.spot_clore_input) {
    request_body['enabled-CLORE-Blockchain'] = is_enabled(elements.clore_checkbox);
    request_body['CLORE-Blockchain_on_demand'] = parseFloat(elements.od_clore_input.value);
    request_body['CLORE-Blockchain_spot'] = parseFloat(elements.spot_clore_input.value);
  }

  servers_by_gpu[gpu].forEach(server => {
    new_gpu_prices_html += `<div class="new-gpu-price">
            <div class="new-gpu-price-column">
              <div class="new-gpu-price-column__title">
                Server name
              </div>
              <div class="new-gpu-price-column__body">
                <span class="aero-caption">${server.name}</span>
              </div>
            </div>
            <div class="new-gpu-price-column">
              <div class="new-gpu-price-column__title">
                GPU
              </div>
              <div class="new-gpu-price-column__body">
                <span class="aero-caption">${server.gpu_count}x ${gpu}</span>
              </div>
            </div>
            <div class="new-gpu-price-column">
              <div class="new-gpu-price-column__title">
                New price
              </div>
              ${request_body.autoprice === 'usd' ? `
                <div class="new-gpu-price-column__body">
                    <div class="new-gpu-price__value">${toFixed(request_body.usd_on_demand * server.gpu_count, 2)} <span>(USD)</span> On demand</div>
                    <div class="new-gpu-price__value">${toFixed(request_body.usd_spot * server.gpu_count, 2)} <span>(USD)</span> Minimal spot</div>
                </div>` : `
                <div class="new-gpu-price-column__body">
                  ${request_body['enabled-CLORE-Blockchain'] && server.pricing['CLORE-Blockchain'] != request_body['CLORE-Blockchain_on_demand']  ? ` <div class="new-gpu-price__value">${toFixed(request_body['CLORE-Blockchain_on_demand'] * server.gpu_count, CONFIG_GLOBAL.decimals_in_pricing['CLORE-Blockchain'])} <span>(CLORE)</span> On demand</div>` : ''}
                  ${request_body['enabled-CLORE-Blockchain'] && server.pricing['CLORE-Blockchain'] != request_body['CLORE-Blockchain_spot'] ? `<div class="new-gpu-price__value">${toFixed(request_body['CLORE-Blockchain_spot'] * server.gpu_count, CONFIG_GLOBAL.decimals_in_pricing['CLORE-Blockchain'])} <span>(CLORE)</span> Minimal spot</div>` : ''}
                  ${request_body['enabled-btc'] && server.pricing.bitcoin != request_body.on_demand ? `<div class="new-gpu-price__value">${toFixed(request_body.on_demand * server.gpu_count, CONFIG_GLOBAL.decimals_in_pricing['bitcoin'])} <span>(BTC)</span> On demand</div>` : ''}
                  ${request_body['enabled-btc'] && server.pricing.bitcoin != request_body.spot ? `<div class="new-gpu-price__value">${toFixed(request_body.spot * server.gpu_count, CONFIG_GLOBAL.decimals_in_pricing['bitcoin'])} <span>(BTC)</span> Minimal spot</div>` : ''}
                </div>`}
            </div>
          </div>
`;
  });

  $('#new-gpu-prices-list').html(new_gpu_prices_html);

  mass_price_modal.closeModal();

  setTimeout(() => {
    new_gpu_prices_modal.openModal();
  }, 150);

  const apply_button = $(`#new-gpu-prices-apply`);

  async function handle_update_gpu_prices() {
    clear_beautiful_alert(`#new-gpu-prices-cs-ba`);

    apply_button.html(`<i class="fa-solid fa-cog fa-spin"></i>`);

    let api_res = await call_api('set_rs_mass', request_body).catch(function (err) {
      cerr = err;
    });

    apply_button.html(`Apply`);

    if (cerr) {
      beautiful_alert(`#new-gpu-prices-cs-ba`, 'Connection error', 'error', 0, false);
    } else if (api_res['error']) {
      beautiful_alert(`#new-gpu-prices-cs-ba`, 'Database error', 'error', 0, false);
    } else {
      beautiful_alert(
        `#new-gpu-prices-cs-ba`,
        '<i class="fa-regular fa-circle-check"></i> Changes applied',
        'success',
        0,
        false,
      );
      // window.location.reload();
      // await refetch_my_servers();
      // set_dirty_mass_price_state(gpu, false);
    }

    setTimeout(() => {
      clear_beautiful_alert(`#new-gpu-prices-cs-ba`);
      // if (cerr || api_res['error']) {
      // set_dirty_mass_price_state(gpu, true);
      // }
    }, 3000);
  }

  $('#new-gpu-prices-apply').off('click').on('click', handle_update_gpu_prices)
}

function set_dirty_mass_price_state(gpu, state) {
  // set dirty flag and enable apply button
  // mass_prices_changes[gpu]['is_dirty'] = state;
  // const gpu_class = gpu.replace(/\s/g, '-');
  // $(`#${gpu_class}-apply-gpu-prices`).toggleClass('aero-btn-primary-disabled', !state);
}

function oc_table_opener_click(){
  const opener = document.querySelector(".oc-gpu-lock-table-opener");
  const table = document.querySelector(".oc-gpu-lock-table");
  opener.classList.toggle("active");
  table.style.display = table.style.display === "flex" ? "none" : "flex";
}

function disableFilter(id) {
  const disableClass = 'disable-filter';
  const filter = document.getElementById(id) || document.querySelectorAll(`[data-id="${id}"]`);

  console.log('filter', filter);

  if (filter) {
    filter.forEach(element => {
      element.classList.add(disableClass);
    });
    console.log('filter', filter);
  }
}

function enableFilter(id) {
  const disableClass = 'disable-filter';
  const filter = document.getElementById(id) || document.querySelectorAll(`[data-id="${id}"]`);

  if (filter) {
    filter.forEach(element => {
      element.classList.remove(disableClass);
    });
  }
}

function render_poh_gpu_capacities(gpu_capacities){
  let t_html = ''
  Object.keys(gpu_capacities).forEach(gpu_type => {
    t_html +=`<tr>
  <td>${gpu_type=='default' || gpu_type.toLocaleLowerCase().includes('nvidia')?'':'NVIDIA '}${gpu_type=='default'?'Other GPU':gpu_type}</td>
  <td>${parseInt(gpu_capacities[gpu_type])} $CLORE</td>
</tr>`
  })
  $(".gpu-capacity-tbody").html(t_html)
}

function frontend_capacity_curve(provider_poh, capacity) {
  if (!capacity || isNaN(provider_poh) || isNaN(capacity)) return 0
  if (capacity >= provider_poh) {
    return provider_poh
  } else {
    return capacity + Math.min(
      capacity,
      (provider_poh - capacity) * 0.5
    )
  }
}

function open_close_gpu_capacity_table(){
  let to_open = $(".poh-capacity-table-opener").html().includes('-up')
  $(".poh-capacity-table-opener").html(to_open?`<i class="fa-solid fa-caret-down"></i>`:`<i class="fa-solid fa-caret-up"></i>`)
  $(".poh-capacity-info").css("display", to_open?"none":"flex")
}

function calculate_and_render_poh_capacity(){
  let total_capacity = 0
  console.log(glob_ms)
  glob_ms.forEach(c_server => {
    if(c_server.working_properly && c_server.rented && c_server.remaining_time && c_server.max_poh_capacity){
      total_capacity+=c_server.max_poh_capacity
    }
  })
  let final_capacity = frontend_capacity_curve(ms_page_acc_all_poh, total_capacity)
  $(".clore-poh-capacity-amount").html(final_capacity.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","))
  //clore-poh-capacity-amount
}