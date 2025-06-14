"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var link_1 = require("next/link");
var Verify = function (props) {
    var onFinish = function (values) {
        console.log('Success:', values);
    };
    var onFinishFailed = function (errorInfo) {
        console.log('Failed:', errorInfo);
    };
    return (react_1["default"].createElement(antd_1.Row, { justify: "center", style: { marginTop: "30px" } },
        react_1["default"].createElement(antd_1.Col, { xs: 24, md: 16, lg: 8 },
            react_1["default"].createElement("fieldset", { style: {
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                } },
                react_1["default"].createElement("legend", null, "K\u00EDch Ho\u1EA1t T\u00E0i Kho\u1EA3n"),
                react_1["default"].createElement(antd_1.Form, { name: "basic", onFinish: onFinish, autoComplete: "off", layout: "vertical" },
                    react_1["default"].createElement(antd_1.Form.Item, { label: "ID", name: "_id", rules: [
                            {
                                required: true,
                                message: "Please input your email!"
                            },
                        ] },
                        react_1["default"].createElement(antd_1.Input, null)),
                    react_1["default"].createElement(antd_1.Form.Item, { label: "Password", name: "password", rules: [
                            {
                                required: true,
                                message: "Please input your password!"
                            },
                        ] },
                        react_1["default"].createElement(antd_1.Input.Password, null)),
                    react_1["default"].createElement(antd_1.Form.Item, { label: "Name", name: "name" },
                        react_1["default"].createElement(antd_1.Input, null)),
                    react_1["default"].createElement(antd_1.Form.Item, null,
                        react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Submit"))),
                react_1["default"].createElement(link_1["default"], { href: "/" },
                    react_1["default"].createElement(icons_1.ArrowLeftOutlined, null),
                    " Quay l\u1EA1i trang ch\u1EE7"),
                react_1["default"].createElement(antd_1.Divider, null),
                react_1["default"].createElement("div", { style: { textAlign: "center" } },
                    "\u0110\u00E3 c\u00F3 t\u00E0i kho\u1EA3n? ",
                    react_1["default"].createElement(link_1["default"], { href: "/auths/login" }, "\u0110\u0103ng nh\u1EADp"))))));
};
exports["default"] = Verify;
