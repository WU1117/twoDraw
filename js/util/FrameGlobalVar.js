//GLES上下文
var gl;
//着色器程序列表，集中管理
var shaderProgArray=new Array();
//变换矩阵管理类对象
var ms=new MatrixState();
//光源位置管理器
var lightManager=new LightManager(0,500,0);
//纹理管理器
var texMap= new Array();
//星空
var celestial;
var celestial1;
var rttFramebuffer;//帧缓冲
var rttTexture;//颜色缓冲
var shaderPath=[//着色器路径数组
    "shader/shader.bns",
    "shader/start.bns",
    "shader/plane.bns"
];
var shaderFlag=false;
var timeID;
var ooTriBall;
var plane;
var canvas;
var objArr=new Array();


