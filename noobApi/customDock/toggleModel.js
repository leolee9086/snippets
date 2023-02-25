import { Tab } from "../customTab/index.js";

export function  toggleModel(type, show = false, close = false) {
        if (!type) {
            return;
        }
        const target = this.element.querySelector(`[data-type="${type}"]`) ;
        if (show && target.classList.contains("dock__item--active")) {
            target.classList.remove("dock__item--active", "dock__item--activefocus");
        }
        const index = parseInt(target.getAttribute("data-index"));
        const wnd = this.layout.children[index] ;
        if (target.classList.contains("dock__item--active")) {
            if (!close) {
                let needFocus = false;
                Array.from(wnd.element.querySelector(".layout-tab-container").children).find(item => {
                    if (item.getAttribute("data-id") === target.getAttribute("data-id")) {
                        if (!item.classList.contains("layout__tab--active")) {
                            setPanelFocus(item);
                            needFocus = true;
                        }
                        return true;
                    }
                });
                if (needFocus) {
                    this.showDock();
                    return;
                }
            }

            target.classList.remove("dock__item--active", "dock__item--activefocus");
            // dock 隐藏
            if (this.element.querySelectorAll(".dock__item--active").length === 0) {
                if (this.position === "Left" || this.position === "Right") {
                    this.layout.element.style.width = "0px";
                } else {
                    this.layout.element.style.height = "0px";
                }
                if (document.querySelector("body").classList.contains("body--win32")) {
                    document.getElementById("drag").classList.remove("fn__hidden");
                }
                this.resizeElement.classList.add("fn__none");
                this.hideDock();
            }
        } else {
            this.element.querySelectorAll(`.dock__item--active[data-index="${index}"]`).forEach(item => {
                item.classList.remove("dock__item--active", "dock__item--activefocus");
            });
            target.classList.add("dock__item--active", "dock__item--activefocus");
            if (!target.getAttribute("data-id")) {
                let tab = new Tab()
                wnd.addTab(tab);
                target.setAttribute("data-id", tab.id);
                this.data[type] = tab.model;
            } else {
                // tab 切换
                Array.from(wnd.element.querySelector(".layout-tab-container").children).forEach(item => {
                    if (item.getAttribute("data-id") === target.getAttribute("data-id")) {
                        item.classList.remove("fn__none");
                        setPanelFocus(item);
                    } else {
                        item.classList.add("fn__none");
                    }
                });
            }
            // dock 显示
            if (this.position === "Left" || this.position === "Right") {
                this.layout.element.style.width = this.getMaxSize() + "px";
            } else {
                this.layout.element.style.height = this.getMaxSize() + "px";
            }
            if ((type === "graph" || type === "globalGraph") &&
                document.querySelector("body").classList.contains("body--win32") && this.layout.element.querySelector(".fullscreen")) {
                document.getElementById("drag").classList.add("fn__hidden");
            }
            if (this.pin) {
                this.layout.element.style.opacity = "";
                this.resizeElement.classList.remove("fn__none");
            }
        }

        // dock 中两个面板的显示关系
        const anotherIndex = index === 0 ? 1 : 0;
        const anotherWnd = this.layout.children[anotherIndex] ;
        const anotherHasActive = this.element.querySelectorAll(`.dock__item--active[data-index="${anotherIndex}"]`).length > 0;
        const hasActive = this.element.querySelectorAll(`.dock__item--active[data-index="${index}"]`).length > 0;
        if (hasActive && anotherHasActive) {
            let firstWnd = wnd;
            if (anotherIndex === 0) {
                firstWnd = anotherWnd;
                anotherWnd.element.nextElementSibling.classList.remove("fn__none");
            } else {
                anotherWnd.element.previousElementSibling.classList.remove("fn__none");
            }
            const firstActiveElement = this.element.querySelector('.dock__item--active[data-index="0"]');
            if (this.position === "Left" || this.position === "Right") {
                const dataHeight = parseInt(firstActiveElement.getAttribute("data-height"));
                if (dataHeight !== 0 && !isNaN(dataHeight)) {
                    firstWnd.element.style.height = dataHeight + "px";
                    firstWnd.element.classList.remove("fn__flex-1");
                }
            } else {
                const dataWidth = parseInt(firstActiveElement.getAttribute("data-width"));
                if (dataWidth !== 0 && !isNaN(dataWidth)) {
                    firstWnd.element.style.width = dataWidth + "px";
                    firstWnd.element.classList.remove("fn__flex-1");
                }
            }
        } else {
            if (anotherIndex === 0) {
                anotherWnd.element.nextElementSibling.classList.add("fn__none");
            } else {
                anotherWnd.element.previousElementSibling.classList.add("fn__none");
            }
        }
        if (!anotherHasActive) {
            anotherWnd.element.classList.add("fn__none");
        } else {
            anotherWnd.element.classList.remove("fn__none");
        }
        if (hasActive) {
            wnd.element.classList.remove("fn__none");
        } else {
            wnd.element.classList.add("fn__none");
        }
        if (hasActive && !anotherHasActive) {
            wnd.element.classList.add("fn__flex-1");
            wnd.element.style.height = "";
            wnd.element.style.width = "";
        } else if (!hasActive && anotherHasActive) {
            anotherWnd.element.classList.add("fn__flex-1");
            anotherWnd.element.style.height = "";
            anotherWnd.element.style.width = "";
        }
        resizeTabs();
        this.showDock();
    }

