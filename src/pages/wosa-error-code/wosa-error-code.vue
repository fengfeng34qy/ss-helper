<template>
    <view class="wosa-error-code">
        <view>
            <view class="code-item">
                <view>1．公共错误码</view>
                <view class="item-indent">(-2)		WOSA版本不对</view>
                <view class="item-indent">(-3)		WOSA版本不对</view>
                <view class="item-indent">(-4)		操作取消</view>
                <view class="item-indent">(-5)		注册表配置不对</view>
                <view class="item-indent">(-6)		注册表配置不对</view>
                <view class="item-indent">(-7) 		注册表配置不对</view>
                <view class="item-indent">(-8) 		注册表配置不对</view>
                <view class="item-indent">(-9) 		注册表配置不对</view>
                <view class="item-indent">(-10) 		注册表配置不对</view>
                <view class="item-indent">(-11) 		注册表配置不对</view>
                <view class="item-indent">(-12) 		注册表配置不对</view>
                <view class="item-indent">(-13)		设备没有准备好，设备故障</view>
                <view class="item-indent">(-14)		设备故障</view>
                <view class="item-indent">(-15)		内部错误</view>
                <view class="item-indent">(-16)		无效地址</view>
                <view class="item-indent">(-17)		无效的APP句柄</view>
                <view class="item-indent">(-18)		无效的缓冲区</view>
                <view class="item-indent">(-19)		无效的命令种类</view>
                <view class="item-indent">(-20)		无效的操作命令</view>
                <view class="item-indent">(-21)		无效的事件类别</view>
                <view class="item-indent">(-22)		无效的服务句柄</view>
                <view class="item-indent">(-23)		无效的服务句柄</view>
                <view class="item-indent">(-24)无效的窗口句柄-WFS_ERR_INVALID_HWND       </view>
                <view class="item-indent">(-25)	无效的参数-WFS_ERR_INVALID_HWNDREG</view>
                <view class="item-indent">(-26)	无效的指针-WFS_ERR_INVALID_POINTER</view>
                <view class="item-indent">(-27)	无效的请求ID-WFS_ERR_INVALID_REQ_ID</view>
                <view class="item-indent">(-28)无效的返回结果-WFS_ERR_INVALID_RESULT</view>
                <view class="item-indent">(-29)无效的SP可能sp服务没有启动-WFS_ERR_INVALID_SERVPROV</view>
                <view class="item-indent">(-30)	无效的参数-WFS_ERR_INVALID_TIMER</view>
                <view class="item-indent"> (-31)	无效的日志级别-WFS_ERR_INVALID_TRACELEVEL</view>
                <view class="item-indent">(-32)服务已经被加锁-WFS_ERR_LOCKED</view>
                <view class="item-indent">(-33)不能调用BLOCKING CALL-WFS_ERR_NO_BLOCKING_CALL</view>
                <view class="item-indent">(-34)sp不存在，可能sp服务没有启动-WFS_ERR_NO_SERVPROV</view>
                <view class="item-indent">(-35)		线程不存在-WFS_ERR_NO_SUCH_THREAD</view>
                <view class="item-indent">(-36)		计时器创建失败-WFS_ERR_NO_TIMER</view>
                <view class="item-indent">(-37)		加锁不成功-WFS_ERR_NOT_LOCKED</view>
                <view class="item-indent">(-38)	不能加载sp的dll-WFS_ERR_NOT_OK_TO_UNLOAD</view>
                <view class="item-indent">(-39)	StartUp失败-WFS_ERR_NOT_STARTED</view>
                <view class="item-indent">(-40)		没有注册事件-WFS_ERR_NOT_REGISTERED</view>
                <view class="item-indent">(-41)	操作正在执行中-WFS_ERR_OP_IN_PROGRESS</view>
                <view class="item-indent">(-42)		内存溢出-WFS_ERR_OUT_OF_MEMORY</view>
                <view class="item-indent">(-43)	WOSA版本不对-WFS_ERR_SERVICE_NOT_FOUND</view>
                <view class="item-indent">(-44)	WOSA版本不对-WFS_ERR_SPI_VER_TOO_HIGH</view>
                <view class="item-indent">(-45) 	WOSA版本不对-WFS_ERR_SPI_VER_TOO_LOW</view>
                <view class="item-indent">(-46) 	WOSA版本不对-WFS_ERR_SRVC_VER_TOO_HIGH</view>
                <view class="item-indent">(-47) 	WOSA版本不对-WFS_ERR_SRVC_VER_TOO_LOW</view>
                <view class="item-indent">(-48)	操作超时-WFS_ERR_TIMEOUT</view>
                <view class="item-indent">(-49)	不支持的查询类别-WFS_ERR_UNSUPP_CATEGORY</view>
                <view class="item-indent">(-50)	不支持的操作命令-WFS_ERR_UNSUPP_COMMAND</view>
                <view class="item-indent"> (-51)	WOSA版本错误-WFS_ERR_VERSION_ERROR_IN_SRVC</view>
                <view class="item-indent">(-52)		无效的数据-WFS_ERR_INVALID_DATA</view>
                <view class="item-indent">(-53)		软件错误-WFS_ERR_SOFTWARE_ERROR</view>
                <view class="item-indent">(-54)		连接断开-WFS_ERR_CONNECTION_LOST</view>
                <view class="item-indent">(-55)		用户使用错误-WFS_ERR_USER_ERROR</view>
                <view class="item-indent">(-56)		不支持的数据-WFS_ERR_UNSUPP_DATA</view>
            </view>
            <view class="code-item">
                <view>2．Printer</view>
                <view class="item-indent">(-100)FORM未找到-WFS_ERR_PTR_FORMNOTFOUND</view>
                <view class="item-indent">(-101)FIELD未找到-WFS_ERR_PTR_FIELDNOTFOUND</view>
                <view class="item-indent">(-102)缺纸-WFS_ERR_PTR_NOMEDIAPRESENT</view>
                <view class="item-indent">(-103)设备不支持读操作-WFS_ERR_PTR_READNOTSUPPORTED</view>
                <view class="item-indent">(-106)Field语法错误-WFS_ERR_PTR_FIELDSPECFAILURE</view>
                <view class="item-indent">(-107)处理Field时发生错误-WFS_ERR_PTR_FIELDERROR</view>
                <view class="item-indent">(-108)Media未找到-WFS_ERR_PTR_MEDIANOTFOUND</view>
                <view class="item-indent">(-109)设备无法获得范围-WFS_ERR_PTR_EXTENTNOTSUPPORTED</view>
                <view class="item-indent">(-110)无效的Media-WFS_ERR_PTR_MEDIAINVALID</view>
                <view class="item-indent">(-111)无效的Form-WFS_ERR_PTR_FORMINVALID</view>
                <view class="item-indent">(-112)无效的Field-WFS_ERR_PTR_FIELDINVALID</view>
                <view class="item-indent">(-113)Media错误-WFS_ERR_PTR_MEDIASKEWED</view>
                <view class="item-indent">(-104)  不支持FLUSH-WFS_ERR_PTR_FLUSHFAIL</view>
                <view class="item-indent">(-105)  Media超域-WFS_ERR_PTR_MEDIAOVERFLOW</view>
                <view class="item-indent">(-114 )  回收箱满-WFS_ERR_PTR_RETRACTBINFULL</view>
                <view class="item-indent">(-115)  STACKE满-WFS_ERR_PTR_STACKERFULL</view>
                <view class="item-indent">(-116)  设备不能翻页-WFS_ERR_PTR_PAGETURNFAIL</view>
                <view class="item-indent">(-117)设备不能翻转介质-WFS_ERR_PTR_MEDIATURNFAIL</view>
                <view class="item-indent">(-118)Shutter执行命令失败-WFS_ERR_PTR_SHUTTERFAIL</view>
                <view class="item-indent">(-119)  卡纸-WFS_ERR_PTR_MEDIAJAMMED</view>
                <view class="item-indent">(-120)  文件读取失败-WFS_ERR_PTR_FILE_IO_ERROR</view>
                <view class="item-indent">(-121)  字符集不一致-WFS_ERR_PTR_CHARSETDATA</view>
                <view class="item-indent">(-122)  卡纸-WFS_ERR_PTR_PAPERJAMMED</view>
                <view class="item-indent">(-123)  缺纸-WFS_ERR_PTR_PAPEROUT</view>
                <view class="item-indent">(-124)  墨水用玩-WFS_ERR_PTR_INKOUT</view>
                <view class="item-indent">(-125)  色带用玩-WFS_ERR_PTR_TONEROUT</view>
                <view class="item-indent">(-126)  成象灯不可操作-WFS_ERR_PTR_LAMPINOP</view>
                <view class="item-indent">(-127)  资源无效-WFS_ERR_PTR_SOURCEINVALID</view>
                <view class="item-indent">(-128)  命令序列不对-WFS_ERR_PTR_SEQUENCEINVALID</view>
                <view class="item-indent">(-129)  介质的长度不对-WFS_ERR_PTR_MEDIASIZE</view>
            </view>
            <view class="code-item">
                <view>3．CardReader</view>
                <view class="item-indent">(-204)	无效的数据-WFS_ERR_IDC_INVALIDDATA</view>
                <view class="item-indent">(-205)	无效的Media-WFS_ERR_IDC_INVALIDMEDIA</view>
                <view class="item-indent">(-206)	Form未找到-WFS_ERR_IDC_FORMNOTFOUND</view>
                <view class="item-indent">(-207)	Form无效-WFS_ERR_IDC_FORMINVALID</view>
                <view class="item-indent">(-200)	卡堵塞-WFS_ERR_IDC_MEDIAJAM</view>
                <view class="item-indent">(-201)	没有卡-WFS_ERR_IDC_NOMEDIA</view>
                <view class="item-indent">(-202)	吞卡-WFS_ERR_IDC_MEDIARETAINED</view>
                <view class="item-indent">(-203)	吞卡箱满-WFS_ERR_IDC_RETAINBINFULL</view>
                <view class="item-indent">(-208)	数据语法错误-WFS_ERR_IDC_DATASYNTAX</view>
                <view class="item-indent">(-209)	打开Shutter失败-WFS_ERR_IDC_SHUTTERFAIL</view>
                <view class="item-indent">(-210)	安全检测失败-WFS_ERR_IDC_SECURITYFAIL</view>
                <view class="item-indent">(-211)	协议不支持-WFS_ERR_IDC_PROTOCOLNOTSUPP</view>
                <view class="item-indent">(-212)	ATR未获得-WFS_ERR_IDC_ATRNOTOBTAINED</view>
                <view class="item-indent">(-213)	Key无效-WFS_ERR_IDC_INVALIDKEY</view>
                <view class="item-indent">(-214)	不支持写的操作-WFS_ERR_IDC_WRITE_METHOD</view>
                <view class="item-indent">(-215)	不支持IC读写-WFS_ERR_IDC_CHIPPOWERNOTSUPP</view>
                <view class="item-indent">(-216)	卡长度过短-WFS_ERR_IDC_CARDTOOSHORT</view>
                <view class="item-indent">(-217)	卡长度过长-WFS_ERR_IDC_CARDTOOLONG</view>
            </view>
            <view class="code-item">
                <view>4．CashDispenser</view>
                <view class="item-indent">(-300)	无效的币种-WFS_ERR_CDM_INVALIDCURRENCY</view>
                <view class="item-indent">(-301)	无效的TellerID-WFS_ERR_CDM_INVALIDTELLERID</view>
                <view class="item-indent">(-302)	钞箱故障-WFS_ERR_CDM_CASHUNITERROR</view>
                <view class="item-indent">(-303)	无效的配钞-WFS_ERR_CDM_INVALIDDENOMINATION</view>
                <view class="item-indent">(-304)	参数错误-WFS_ERR_CDM_INVALIDMIXNUMBER</view>
                <view class="item-indent">(-305)	参数错误-WFS_ERR_CDM_NOCURRENCYMIX</view>
                <view class="item-indent">(-306)无法挖出指定的钞票-WFS_ERR_CDM_NOTDISPENSABLE</view>
                <view class="item-indent">(-307)要求挖的钞票过多无法挖出-WFS_ERR_CDM_TOOMANYBILLS</view>
                <view class="item-indent">(-308)	无效的位置-WFS_ERR_CDM_INVALIDPOSITION</view>
                <view class="item-indent">(-309)	出口位置被锁住-WFS_ERR_CDM_POSITIONLOCKED</view>
                <view class="item-indent">(-310)	挖钞时安全门是打开的，无法挖钞-WFS_ERR_CDM_SAFEDOOROPEN</view>
                <view class="item-indent">(-311)	Retract命令无效-WFS_ERR_CDM_INVALIDRETRACT</view>
                <view class="item-indent">(-312)	Shutter打开失败-WFS_ERR_CDM_SHUTTERNOTOPEN</view>
                <view class="item-indent">(-313)	Shutter已经打开-WFS_ERR_CDM_SHUTTEROPEN</view>
                <view class="item-indent">(-314)	Shutter已经关闭-WFS_ERR_CDM_SHUTTERCLOSED</view>
                <view class="item-indent">(-315)	无效的钞箱编号-WFS_ERR_CDM_INVALIDCASHUNIT</view>
                <view class="item-indent">(-316)	没有钞票-WFS_ERR_CDM_NOBILLS</view>
                <view class="item-indent">(-317)设备处于维护状态中-WFS_ERR_CDM_EXCHANGEACTIVE</view>
                <view class="item-indent">(-318)设备未处于维护状态中-WFS_ERR_CDM_NOEXCHANGEACTIVE</view>
                <view class="item-indent">(-319)	Shutter关闭失败-WFS_ERR_CDM_SHUTTERNOTCLOSED</view>
                <view class="item-indent">(-320)	送钞时没有钞票-WFS_ERR_CDM_PRERRORNOBILLS</view>
                <view class="item-indent">(-321)送钞时发生错误，并且部分钞票已送出-WFS_ERR_CDM_PRERRORBILLS</view>
                <view class="item-indent">(-322)	送钞时发生错误，钞票位置未知-WFS_ERR_CDM_PRERRORUNKNOWN</view>
                <view class="item-indent">(-323)收钞时部分或全部钞票被取走-WFS_ERR_CDM_BILLSTAKEN</view>
                <view class="item-indent">(-324)  要求挖的硬币过多-WFS_ERR_CDM_TOOMANYCOINS</view>
                <view class="item-indent">(-325)设备处于存款过程中-WFS_ERR_CDM_CASHINACTIVE</view>
                <view class="item-indent">(-326)  没有开始存款过程-WFS_ERR_CDM_NOCASHINSTARTED</view>
                <view class="item-indent">(-327)  无效的配钞表-WFS_ERR_CDM_INVALIDMIXTABLE</view>
                <view class="item-indent">(-328)	出钞口有钞票-WFS_ERR_CDM_OUTPUTPOS_NOT_EMPTY</view>
                <view class="item-indent">(-329回收钞票位置无效-WFS_ERR_CDM_INVALIDRETRACTPOSITION</view>
                <view class="item-indent">(-330)	指定的回收位置不支持-WFS_ERR_CDM_NOTRETRACTAREA</view>
                <view class="item-indent">(-333)	没有Cash bo-WFS_ERR_CDM_NOCASHBOXPRESENTx</view>
                <view class="item-indent">(-334)	指定的配钞没有在配钞表中-WFS_ERR_CDM_AMOUNTNOTINMIXTABLE</view>
                <view class="item-indent">(-335)	钞票未拿走-WFS_ERR_CDM_ITEMSNOTTAKEN</view>
                <view class="item-indent">(-336)钞票遗留在钞道或出钞口上-WFS_ERR_CDM_ITEMSLEFT</view>
            </view>
            <view class="code-item">
                <view>5．Pinpad</view>
                <view class="item-indent">(-400)		按键未找到-WFS_ERR_PIN_KEYNOTFOUND</view>
                <view class="item-indent">(-401)	   不支持的模式-WFS_ERR_PIN_MODENOTSUPPORTED</view>
                <view class="item-indent">(-402)		访问拒绝-WFS_ERR_PIN_ACCESSDENIED</view>
                <view class="item-indent">(-403)		ID无效-WFS_ERR_PIN_INVALIDID</view>
                <view class="item-indent">(-404)		Key已存在-WFS_ERR_PIN_DUPLICATEKEY</view>
                <view class="item-indent">(-406)	    Key没有加载-WFS_ERR_PIN_KEYNOVALUE</view>
                <view class="item-indent">(-407)	    Key使用不对-WFS_ERR_PIN_USEVIOLATION</view>
                <view class="item-indent">(-408)	 键盘中没有密码-WFS_ERR_PIN_NOPIN</view>
                <view class="item-indent">(-409)	 无效的Key长度-WFS_ERR_PIN_INVALIDKEYLENGTH</view>
                <view class="item-indent">(-410)		无效的按键-WFS_ERR_PIN_KEYINVALID</view>
                <view class="item-indent">(-411)   存在不支持的按键-WFS_ERR_PIN_KEYNOTSUPPORTED</view>
                <view class="item-indent">(-412)   没有激活任何按键-WFS_ERR_PIN_NOACTIVEKEYS</view>
                <view class="item-indent">(-413)		无效的key-WFS_ERR_PIN_INVALIDKEY</view>
                <view class="item-indent">(-414)	       没有终止键-WFS_ERR_PIN_NOTERMINATEKEYS</view>
                <view class="item-indent">(-415)  最小密码长度无效-WFS_ERR_PIN_MINIMUMLENGTH</view>
                <view class="item-indent">(-416)	协议不支持-WFS_ERR_PIN_PROTOCOLNOTSUPP</view>
                <view class="item-indent">(-417)	无效的数据-WFS_ERR_PIN_INVALIDDATA</view>
                <view class="item-indent">(-418)	不允许进行操作-WFS_ERR_PIN_NOTALLOWED</view>
                <view class="item-indent">(-419)  Key RAM空间不够-WFS_ERR_PIN_NOKEYRAM</view>
                <view class="item-indent">(-420)  还没开始hipTransaction-WFS_ERR_PIN_NOCHIPTRANSACTIVE</view>
                <view class="item-indent">(-421)		算法不支持-WFS_ERR_PIN_ALGORITHMNOTSUPP</view>
                <view class="item-indent">(-422)		格式不支持-WFS_ERR_PIN_FORMATNOTSUPP</view>
                <view class="item-indent">(-423)		HSMSTATE无效-WFS_ERR_PIN_HSMSTATEINVALID</view>
                <view class="item-indent">(-424)		MAC无效-WFS_ERR_PIN_MACINVALID</view>
                <view class="item-indent">(-425)		协议无效-WFS_ERR_PIN_PROTINVALID</view>
                <view class="item-indent">(-426)		格式无效-WFS_ERR_PIN_FORMATINVALID</view>
                <view class="item-indent">(-427)		内容无效-WFS_ERR_PIN_CONTENTINVALID</view>
            </view>
            <view class="code-item">
                <view>6．TTU</view>
                <view class="item-indent">(-701)		Field错误-WFS_ERR_TTU_FIELDERROR</view>
                <view class="item-indent">(-702)		Field无效-WFS_ERR_TTU_FIELDINVALID</view>
                <view class="item-indent">(-703)	       Field未找到-WFS_ERR_TTU_FIELDNOTFOUND</view>
                <view class="item-indent">(-704)	     Field语法错误-WFS_ERR_TTU_FIELDSPECFAILURE</view>
                <view class="item-indent">(-705)	       无效的Form-WFS_ERR_TTU_FORMINVALID</view>
                <view class="item-indent">(-706)          Form未找到-WFS_ERR_TTU_FORMNOTFOUND</view>
                <view class="item-indent">(-707)	         LED无效-WFS_ERR_TTU_INVALIDLED</view>
                <view class="item-indent">(-708)            按键取消-WFS_ERR_TTU_KEYCANCELED</view>
                <view class="item-indent">(-709)          Media超域-WFS_ERR_TTU_MEDIAOVERFLOW</view>
                <view class="item-indent">(-710)	     分辨率不支持-WFS_ERR_TTU_RESNOTSUPP</view>
                <view class="item-indent">(-711)	       字符集不对-WFS_ERR_TTU_CHARSETDATA</view>
                <view class="item-indent">(-712)		按键无效-WFS_ERR_TTU_KEYINVALID</view>
                <view class="item-indent">(-713)		按键不支持-WFS_ERR_TTU_KEYNOTSUPPORTED</view>
                <view class="item-indent">(-714)	    没有激活任何按键-WFS_ERR_TTU_NOACTIVEKEYS</view>
            </view>
            <view class="code-item">
                <view>7．SIU</view>
                <view class="item-indent">(-801)		端口无效-WFS_ERR_SIU_INVALID_PORT</view>
                <view class="item-indent">(-802)		参数错误-WFS_ERR_SIU_SYNTAX</view>
                <view class="item-indent">(-803)		执行命令时硬件故障-WFS_ERR_SIU_PORT_ERROR</view>
            </view>
            <view class="code-item">
                <view>8．CashAcceptor</view>
                <view class="item-indent">(-1300)	  无效币种-WFS_ERR_CIM_INVALIDCURRENCY</view>
                <view class="item-indent">(-1301)   无效的TellerID-WFS_ERR_CIM_INVALIDTELLERID</view>
                <view class="item-indent">(-1302)   钞箱故障-WFS_ERR_CIM_CASHUNITERROR</view>
                <view class="item-indent">(-1307)   存款放入的钞票过多-WFS_ERR_CIM_TOOMANYITEMS</view>
                <view class="item-indent">(-1308)   指定的位置不支持-WFS_ERR_CIM_UNSUPPOSITION</view>
                <view class="item-indent">(-1310)   存款时安全门是打开的-WFS_ERR_CIM_SAFEDOOROPEN</view>
                <view class="item-indent">(-1312)   Shutter打开失败-WFS_ERR_CIM_SHUTTERNOTOPEN</view>
                <view class="item-indent">(-1313)   Shutter已经打开-WFS_ERR_CIM_SHUTTEROPEN</view>
                <view class="item-indent">(-1314)   Shutter已经关闭-WFS_ERR_CIM_SHUTTERCLOSED</view>
                <view class="item-indent">(-1315)   无效的钞箱编号-WFS_ERR_CIM_INVALIDCASHUNIT</view>
                <view class="item-indent">(-1316)没有钞票-WFS_ERR_CIM_NOITEMS</view>
                <view class="item-indent">(-1317)   设备处于维护状态-WFS_ERR_CIM_EXCHANGEACTIVE</view>
                <view class="item-indent">(-1318)   设备没有处于维护状态-WFS_ERR_CIM_NOEXCHANGEACTIVE</view>
                <view class="item-indent">(-1319)   Shutter关闭失败-WFS_ERR_CIM_SHUTTERNOTCLOSED</view>
                <view class="item-indent">(-1323)   回收钞票时部分钞票被拿走-WFS_ERR_CIM_ITEMSTAKEN</view>
                <view class="item-indent">(-1325)   设备处于存款过程中-WFS_ERR_CIM_CASHINACTIVE</view>
                <view class="item-indent">(-1326)   设备没有处于存款过程中-WFS_ERR_CIM_NOCASHINACTIVE</view>
                <view class="item-indent">(-1328)   入钞或出钞口有钞票-WFS_ERR_CIM_POSITION_NOT_EMPTY</view>
                <view class="item-indent">(-1334)   回收位置无效-WFS_ERR_CIM_INVALIDRETRACTPOSITION</view>
                <view class="item-indent">(-1335)   指定的回收位置不可用-WFS_ERR_CIM_NOTRETRACTAREA</view>
            </view>
            <view class="rule-end">------ 结 束 ------</view>
        </view>
    </view>
</template>
<script>
export default {
    config: {
        navigationBarTitleText: "自助小帮手",
        usingComponents: {},
    },
    data() {
        return {}
    },
    components: {},
    onLoad() {},
    methods: {}
}
</script>
<style scoped>
.code-item {
  font-size: 20rpx;
}
.item-indent {
  text-indent: 1rem;
}
.rule-end {
  text-align: center;
  color: #ccc;
}
</style>