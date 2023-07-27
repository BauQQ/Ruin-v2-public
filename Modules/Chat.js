/*
 * Chat class
 */

class Chat {
    constructor() {
        GlobalChatlog = Storage.Get(MemKeys.ChatLog);
        if (GlobalChatlog == undefined || GlobalChatlog == null || GlobalChatlog == '') {
            GlobalChatlog = {};
        } else {
            GlobalChatlog = $.parseJSON(GlobalChatlog);
        }

        Actions.Add("enabledisableemote", UI.Reload);
        Actions.Add("whisperwindows", UI.Reload);
        
        Settings.Add("chatmainspacer", "spacer", false, "", false, "main", "Chat", null, null, null, 150);
        Settings.Add("enabledisableemote", "tick", true, "Enable or disable emotes in the chat", false, "main", "Emotes", null, null, null, 158);
        Settings.Add("whisperwindows", "tick", false, "Enable or disable whisper windows", false, "main", "Whisper Windows", null, null, null, 159);
        Settings.Add("hidewhisperonwindows", "tick", false, "Enable or disable whispers from chat", false, "main", "Hidden Whisper", null, null, null, 160);

        Chat.AddCommand("<DND>", { r: "<DND>", f: Chat.DND });
        Chat.ReloadedChat();
    }

    static async LoadActiveWhispers() {
        ActiveWhispers = await Storage.Get(`${MemKeys.WhisperTabs}${Player.Name()}`);
        if (UI.Exist(ActiveWhispers)) {
            ActiveWhispers = JSON.parse(ActiveWhispers);
        } else {
            ActiveWhispers = [];
        }
    }

    static async CloseTab(e) {
        let target = $(e.target);
        let close = false;
        let name = null;
        if ($(target).hasClass('close_whisper')) {
            name = $(target).parent().attr('data-name');
            close = true;
        } else {
            name = $(target).attr('data-name');
        }

        if (name != null) {
            if (close) {
                Chat.DeleteWhisperWindow(name, target);
            } else {
                Chat.OpenWhisper(name);
            }
        }
    }
    static async WhisperWindows() {
        if (Settings.Get("whisperwindows")) {
            let chat = $(`#${Classes.uichat}`);
            if (UI.Exist(chat)) {
                let html = await Elements.Build('whisperWindowBase', { cls: "", a: "" });
                UI.Prepend(chat, html);


                Input.DelegateClick($(`#${Classes.uichat} .new_chat_button`), $(`#${Classes.uichat} .new_chat_button `), function (e) {
                    Chat.StartNewChatWindow();
                });

                /*Input.DelegateClick($(`#${Classes.uichat} .chat_history`), $(`#${Classes.uichat} .chat_history`), function (e) {
                    //hideOnClicks
                    console.log();
                });*/

                Input.DelegateClick($(`#${Classes.uichat} .${Classes.current_whisper_tabs}`), $(`#${Classes.uichat} .${Classes.current_whisper_tabs}`), function (e) {
                    Chat.CloseTab(e);
                });

                Chat.GenerateWhisperTabs();
            }
        }
    }

    static async StartNewChatWindow() {
        const buildData = {
            name: `Start New Chat`,
            cls: `r2_new_whisper_chat`,
            svelte: `r2_new_whisper_chat`,
            base: "windowPanel",
            nx: `r2_new_whisper_chat`,
            close: Classes.closefeature,
            minimize: Classes.minimizefeature,
            internal: "script_builder_internal",
            modable: true,
            size: {
                width: 0,
                height: 0
            },
            resize: true,
            position: {
                top: 150,
                left: 150
            }
        }

        let innerHtml = await Elements.Build("blankinput", { c: `${buildData.cls}_who`, t: "text", a: `data-action="create_whisper_to"` });

        await Modal.Create(buildData, { html: innerHtml }, false, true);

        UI.Delegate(`.${buildData.cls}`, "keydown", `.${buildData.cls}_who`, function (e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                setTimeout(function () {
                    let name = $(e.target).val();
                    if (name != null && name != '') {
                        Chat.OpenWhisper(name);
                        Interaction.CloseWindow(buildData.name.toLowerCase());
                    }
                }, 10);
            }
        });

        let element = $(`.${buildData.cls}`)[0];

        if (UI.Exist(element)) {
            UI.WindowOpened(buildData.name.toLowerCase());
            if (!$(element).is(":visible")) {
                $(element).show();
                $(`.${buildData.cls}_who`).focus();
            }
        }
    }

    static async DeleteWhisperWindow(name, target) {
        Chat.RemoveActiveWhispers(name);
        Storage.Set(`${MemKeys.WhisperTabs}${Player.Name()}`, JSON.stringify(ActiveWhispers));
        $(`#${Classes.uichat} .${Classes.current_whisper_tabs} span`).each(function (i, v) {
            if ($(v).data('name') == name) {
                $(v).remove();
            }
        });

        Interaction.CloseWindow(`Whisper: ${name}`);
    }

    static async PulseState(name, state) {
        $(`#${Classes.uichat} .${Classes.current_whisper_tabs} span`).each(function (i, v) {
            if ($(v).data('name') == name) {
                if (state) {
                    $(v).addClass('new_pulse');
                } else {
                    $(v).removeClass('new_pulse');
                }
            }
        });
    }

    static async GenerateWhisperTabs() {
        $.each(ActiveWhispers, function (i, v) {
            Chat.AddActiveWhispers(v);
        });
    }

    static async RemoveActiveWhispers(name) {
        let index = ActiveWhispers.indexOf(name);
        if (index > -1) {
            ActiveWhispers.splice(index, 1);
        }
    }

    static async AddActiveWhispers(name) {
        if (!ActiveWhispers.includes(name)) {
            ActiveWhispers.push(name);
            Storage.Set(`${MemKeys.WhisperTabs}${Player.Name()}`, JSON.stringify(ActiveWhispers));
        }
        Chat.GenerateWhisperTab(name);
    }

    static async OpenWhisper(name, type = null, text = null) {
        Chat.AddActiveWhispers(name);
        Chat.PulseState(name, false);

        Chat.GenerateWhisperWindow(name, type, text);
    }

    static GenerateWhisperTab(name) {
        let tab = $(`#${Classes.uichat} .${Classes.current_whisper_tabs} span[data-name="${name}"]`)[0];
        if (!UI.Exist(tab)) {
            let tabs = $(`#${Classes.uichat} .${Classes.current_whisper_tabs} span`);
            if (tabs.length <= 3) {
                let html = Elements.Build('whisperTabSpan', { player: name, name: name });
                UI.Append($(`#${Classes.uichat} .${Classes.current_whisper_tabs}`), html);
                return true;
            }
        }
        Chat.PulseState(name, true);
        return false;
    }

    static async GenerateWhisperWindow(name, type = null, text = null, display = true) {
        const buildData = {
            name: `Whisper: ${name}`,
            cls: `r2_whisper_window_${name}`,
            svelte: `r2_whisper_window`,
            base: "windowWhisperPanel",
            nx: `r2_whisper_window_${name}`,
            close: Classes.closefeature,
            minimize: Classes.minimizefeature,
            internal: "blank_interal_div",
            modable: true,
            size: {
                width: 0,
                height: 0
            },
            resize: true,
            position: {
                top: 150,
                left: 150
            }
        }

        let element = $(`.${buildData.cls}`)[0];
        if (UI.Exist(element)) {
            let internalChatContent = "";
            if (type != null && text != null) {
                let itime = Date.now();
                let DateObject = Utility.ToLocalTime(itime/1000);
                let dateTimesstring = DateObject.toLocaleString();
                let x = 1;
                for (let entry in ChatEmotes) {
                    if (text.includes(entry)) {
                        if (x > maxEmotes) {
                            break;
                        } else {
                            text = text.replaceAll(entry, `<img class="emoteCorScale" src="${ChatEmotes[entry]}" >`);
                            x++;
                        }
                    }
                }

                if (type == "wto") {
                    internalChatContent += `<div data-mkey="${itime / 1000}" class="message received">
                    <p>${text}                            
                    <br />
                    <span class="timestamp">${dateTimesstring}</span>
                    </p>
                    </div>`;
                } else if (type == "wfrom") {
                    internalChatContent += `<div data-mkey="${itime / 1000}" class="message sent">
                    <p>${text}                            
                    <br />
                    <span class="timestamp">${dateTimesstring}</span>
                    </p>
                    </div>`;
                }
                UI.Append($(`.${buildData.cls} .internal_chat_area .chat-body`)[0], internalChatContent);
            }

            if (!$(element).is(":visible")) {
                if(display){
                    $(element).show();
                }
            }
            
            $(`.${buildData.cls} .internal_chat_area .chat-body`).scrollTop($(`.${buildData.cls} .internal_chat_area .chat-body`)[0].scrollHeight);

        } else {
            $(`${buildData.nid}`).remove();

            $("head").append(`<style id='${buildData.nid}' type='text/css'>
                #${buildData.nid}{
                    display: none;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            </style>`);

            let internalChatContent = "";
            if (GlobalChatlog.hasOwnProperty(name)) {
                $.each(GlobalChatlog[name], function (i, v) {
                    if (v != null) {
                        let x = 1;
                        for (let entry in ChatEmotes) {
                            if (v.x.includes(entry)) {
                                if (x > maxEmotes) {
                                    break;
                                } else {
                                    v.x = v.x.replaceAll(entry, `<img class="emoteCorScale" src="${ChatEmotes[entry]}" >`);
                                    x++;
                                }
                            }
                        }
                        let DateObject = Utility.ToLocalTime(i);
                        let dateTimesstring = DateObject.toLocaleString();
                        if (v.y == "wto") {
                            internalChatContent += `<div data-mkey="${i}" class="message received">
                            <p>${v.x}                            
                            <br />
                            <span class="timestamp">${dateTimesstring}</span>
                            </p>
                            </div>`;
                        } else if (v.y == "wfrom") {
                            internalChatContent += `<div data-mkey="${i}" class="message sent">
                            <p>${v.x}                            
                            <br />
                            <span class="timestamp">${dateTimesstring}</span>
                            </p>
                            </div>`;
                        }
                    }
                });
            }

            let xhtml = `
            <div class="chat-body scrollbar">
               ${internalChatContent}
            </div>
            <div class="chat-footer">
                <input class="send_whisper_to" type="text" placeholder="Type your message...">
                <button class="btn send_whisper_to_btn">Send</button>
            </div>`;

            let innerHtml = await Elements.Build(buildData.internal, { cls: buildData.cls, a: " ", html: xhtml });

            await Modal.Create(buildData, { html: innerHtml, cls: "internal_chat_area", a: " " }, false, true, true);

            element = $(`.${buildData.cls}`)[0];

            if (UI.Exist(element)) {
                $(element).css({ width: 350 + "px", "z-index": 999 });
                UI.WindowOpened(buildData.name.toLowerCase());
                UI.Position(element, "absolute", buildData.position.top, buildData.position.left);

                let handle = $(element).find(`.${Classes.windowHandle}`)[0];
                if (handle != undefined) {
                    $(element).addClass("stackable");
                    Customizer.AddDrag(element, handle, null);
                }

                Chat.EmoteSuggestorWhisper(buildData.cls);

                Input.DelegateClick($(`.r2_whisper_window_${name} .chat-footer button.send_whisper_to_btn`), $(`.r2_whisper_window_${name} .chat-footer button.send_whisper_to_btn`), function (e) {
                    let text = $(`.r2_whisper_window_${name} .send_whisper_to`).val();
                    if (text != "") {
                        Chat.SendWhisper(name, text);
                        $(e.target).parent().find("input").val("");
                    }
                });

                UI.Delegate(`.r2_whisper_window_${name} .chat-footer`, "keydown", `.send_whisper_to`, function (e) {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        let text = $(e.target).val();
                        Chat.SendWhisper(name, text);
                        $(e.target).parent().find("input").val("");
                    }else if (e.keyCode == 9) {
                        e.preventDefault();
                        if (typeof ChatVars.emoteToFind != undefined && typeof ChatVars.emoteToFind!= undefined && ChatVars.emoteToFind.length >= 3) {
                            let emotePanel = $(`.r2_whisper_window_${name} .${Classes.chatEmotePanel}`);
                            if (UI.Exist(emotePanel)) {
                                if ($(emotePanel).is(":visible")) {
                                    ChatVars.EmoteToSelect = $(emotePanel).find('.choice.active').first()[0];
                                    if (UI.Exist(ChatVars.EmoteToSelect)) {
                                        $(ChatVars.EmoteToSelect).click();
                                    }
                                }
                            }
                        }
                    } else if (e.keyCode == 38) {
                        e.preventDefault();
                        Chat.NavigateEmoteListWhisper(`r2_whisper_window_${name}`,-1);
                    } else if (e.keyCode == 40) {
                        e.preventDefault();
                        Chat.NavigateEmoteListWhisper(`r2_whisper_window_${name}`,1);
                    }
                });

                Input.DelegateClick($(`.r2_whisper_window_${name}`), $(`.r2_whisper_window_${name} ${Classes.closeicon}`), function (e) {
                    if ($(e.target).hasClass(Classes.closefeature)) {
                        Chat.DeleteWhisperWindow(name);
                    } else if ($(e.target).hasClass(Classes.minimizefeature)) {
                        $(element).hide();
                    }
                });

                
                if (!$(element).is(":visible")) {
                    if(display){
                        UI.WindowOpened(buildData.name.toLowerCase());
                        $(element).show();
                    }
                }

                let scrollElement = $(`.${buildData.cls} .internal_chat_area .chat-body`)[0];
                $(scrollElement).scrollTop($(scrollElement)[0].scrollHeight);
            }
        }
    }

    static async EmoteSuggestorWhisper(window_id) {
        let emotepanel = $(`#${window_id} .${Classes.chatEmotePanel}`);
        if (UI.Exist(emotepanel)) {
            emotepanel.remove();
        }
        emotepanel = await Elements.Build('emptyDivNoScroll', { cls: `${Classes.chatEmotePanel} whisperemotelist context emotelist ${Classes.chatSvelte}`, a: "", html: "" });
        $(`#${window_id}`).append(emotepanel);

        UI.Delegate(`#${window_id} .internal_chat_area `, "keyup", `input.send_whisper_to`, function (e) {
            if (e.keyCode == 9 || e.keyCode == 38 || e.keyCode == 40) {
                return;
            }
            ChatVars.text = $(e.target).val();
            if (ChatVars.text.startsWith("/")) {
                return;
            }

            if (ChatVars.text.includes(":")) {
                ChatVars.emoteToFind = ":" + ChatVars.text.split(":").pop();
                ChatVars.lastEmoteE = true;
                ChatVars.uPosition = ChatVars.text.indexOf(":", e.target.selectionStart);
                if (ChatVars.text.indexOf(":", -e.target.selectionStart) != -1) {
                    if (ChatVars.text.length == e.target.selectionStart) {
                        ChatVars.emoteToFind = ":" + ChatVars.text.split(":").pop().trim();
                    } else {
                        let [o1, o2] = Utility.splitStringAt(ChatVars.text, ChatVars.uPosition);
                        ChatVars.emoteToFind = ":" + o1.split(":").pop().trim();
                        ChatVars.lastEmoteE = false;
                    }
                }
                Chat.EmoteInputFinderWhisper(window_id);

            } else {
                $(`.${Classes.chatEmotePanel}`).hide();
            }
        });
    }

    static async EmoteInputFinderWhisper(window_id) {
        let suggestEmote = {};
        if (ChatVars.emoteToFind.length >= 3) {
            for (let entry in ChatEmotes) {
                if (entry.startsWith(`${ChatVars.emoteToFind}`)) {
                    suggestEmote[entry] = ChatEmotes[entry];
                }
            }
            if (Object.keys(suggestEmote).length > 0) {
                UI.Empty($(`#${window_id} .${Classes.chatEmotePanel}`));
                $.each(suggestEmote, function (key, value) {
                    let nEmote = key.replaceAll(":", "");
                    let emote = Elements.Build('emptyDivNoScroll', { cls: `emoteCorScale emote_${nEmote} choice ${Classes.chatSvelte}`, a: `data-emote="${nEmote}"`, html: ` <span><img class="emoteCorScale emoteImage" src="${value}" ></span>${key}` });
                    $(`#${window_id} .${Classes.chatEmotePanel}`).append(emote);
                    Input.DelegateClick($(`#${window_id} div[data-emote="${nEmote}"]`), $(`#${window_id} div[data-emote="${nEmote}"]`), function (e) {
                        let femote = $(e.currentTarget).attr("data-emote");
                        Chat.EmoteInputReplacerWhisper(femote, window_id);
                    });
                });

                $(`#${window_id} .${Classes.chatEmotePanel}`).find('.choice').first().addClass('active');

                $(`#${window_id} .${Classes.chatEmotePanel}`).show();
            } else {
                $(`#${window_id} .${Classes.chatEmotePanel}`).hide();
            }
        } else {
            $(`#${window_id} .${Classes.chatEmotePanel}`).hide();
        }
    }

    static async EmoteInputReplacerWhisper(femote, window_id) {
        if (!ChatVars.lastEmoteE) {
            let [p1, p2] = Utility.splitStringAt(ChatVars.text, ChatVars.uPosition);
            p1 = Utility.replaceLast(p1, `${ChatVars.emoteToFind}`, `:${femote}: `);
            ChatVars.text = p1 + p2;
        } else {
            ChatVars.text = Utility.replaceLast(ChatVars.text, `${ChatVars.emoteToFind}`, `:${femote}: `);
        }
        $(`#${window_id} input`).val(`${ChatVars.text}`).focus();
        $(`#${window_id} .${Classes.chatEmotePanel}`).hide();
        ChatVars = {};
    }


    static async WhisperWindowsProcess(name, text, type) {
        let window = $(`.r2_whisper_window_${name}`)[0];
        if (type == "wfrom") {
            Chat.AddActiveWhispers(name, type, text);
            if (UI.Exist(window)) {
                if ($(window).is(":visible")) {
                    Chat.GenerateWhisperWindow(name, type, text);
                    Chat.PulseState(name, false);
                } else {
                    Chat.GenerateWhisperWindow(name, type, text, false);
                    Chat.PulseState(name, true);
                }
            } else {
                
                Chat.GenerateWhisperWindow(name, type, text, false);
                Chat.PulseState(name, true);
            }

        } else if (type == "wto") {
            Chat.OpenWhisper(name, type, text);
        }
    }

    static NavigateEmoteListWhisper(window_id, diff) {
        let emotePanel = $(`#${window_id} .${Classes.chatEmotePanel}`);
        if (UI.Exist(emotePanel)) {
            if ($(emotePanel).is(":visible")) {
                let active = $(emotePanel).find('.choice.active').first();
                if (UI.Exist(active)) {
                    if (diff == -1) {
                        let prev = $(active).prev()[0];
                        if (UI.Exist(prev)) {
                            $(active).removeClass('active');
                            $(prev).addClass('active');
                        } else {
                            $(active).removeClass('active');
                            $(emotePanel).find('.choice').last().addClass('active');
                        }
                        return;
                    } else if (diff == 1) {
                        let next = $(active).next()[0];
                        if (UI.Exist(next)) {
                            $(active).removeClass('active');
                            $(next).addClass('active');
                        } else {
                            $(active).removeClass('active');
                            $(emotePanel).find('.choice').first().addClass('active');
                        }
                    }
                }
            }
        }
    }
    

    static NavigateEmoteList(diff) {
        let emotePanel = $(`.${Classes.chatEmotePanel}`);
        if (UI.Exist(emotePanel)) {
            if ($(emotePanel).is(":visible")) {
                let active = $(emotePanel).find('.choice.active').first();
                if (UI.Exist(active)) {
                    if (diff == -1) {
                        let prev = $(active).prev()[0];
                        if (UI.Exist(prev)) {
                            $(active).removeClass('active');
                            $(prev).addClass('active');
                        } else {
                            $(active).removeClass('active');
                            $(emotePanel).find('.choice').last().addClass('active');
                        }
                        return;
                    } else if (diff == 1) {
                        let next = $(active).next()[0];
                        if (UI.Exist(next)) {
                            $(active).removeClass('active');
                            $(next).addClass('active');
                        } else {
                            $(active).removeClass('active');
                            $(emotePanel).find('.choice').first().addClass('active');
                        }
                    }
                }
            }
        }
    }

    static async EmoteTabSelect() {
        $(`#chatinput input.${Classes.chatSvelte}`).off('keydown');
        $(`#chatinput input.${Classes.chatSvelte}`).on('keydown', function (e) {
            if (e.keyCode == 9) {
                e.preventDefault();
                if (typeof ChatVars.emoteToFind != undefined && ChatVars.emoteToFind.length >= 3) {
                    let emotePanel = $(`.${Classes.chatEmotePanel}`);
                    if (UI.Exist(emotePanel)) {
                        if ($(emotePanel).is(":visible")) {
                            ChatVars.EmoteToSelect = $(emotePanel).find('.choice.active').first()[0];
                            if (UI.Exist(ChatVars.EmoteToSelect)) {
                                $(ChatVars.EmoteToSelect).click();
                            }
                        }
                    }
                }
            } else if (e.keyCode == 38) {
                e.preventDefault();
                Chat.NavigateEmoteList(-1);
                $(`#chatinput input.${Classes.chatSvelte}`).val(`${ChatVars.text}`);
                setTimeout(function () {
                    if (typeof ChatVars.emoteToFind != undefined && ChatVars.emoteToFind.length >= 3) {
                        $(`#chatinput .commandlist .${ChatData.data.formatted[ChatVars.chatSection]}`).click();
                        $(`#chatinput input.${Classes.chatSvelte}`).val(` ${ChatVars.text}`);
                    }
                }, 1);
            } else if (e.keyCode == 40) {
                e.preventDefault();
                Chat.NavigateEmoteList(1);
                setTimeout(function () {
                    if (typeof ChatVars.emoteToFind != undefined && ChatVars.emoteToFind.length >= 3) {
                        $(`#chatinput .commandlist .${ChatData.data.formatted[ChatVars.chatSection]}`).click();
                        $(`#chatinput input.${Classes.chatSvelte}`).val(`${ChatVars.text}`);
                    }
                }, 1);
            }
        });
    }

    static async EmoteSuggestor() {
        let emotepanel = $(`.${Classes.chatEmotePanel}`);
        if (UI.Exist(emotepanel)) {
            emotepanel.remove();
        }
        emotepanel = await Elements.Build('emptyDivNoScroll', { cls: `${Classes.chatEmotePanel} context emotelist ${Classes.chatSvelte}`, a: "", html: "" });
        $(`#${Classes.chatInput}`).append(emotepanel);

        $(`#chatinput input.${Classes.chatSvelte}`).off('input propertychange');
        $(`#chatinput input.${Classes.chatSvelte}`).on('input propertychange', function (e) {
            ChatVars.text = $(this).val();
            if (ChatVars.text.startsWith("/")) {
                return;
            }

            if (ChatVars.text.includes(":")) {
                ChatVars.chatSection = $(`#${Classes.chatInput} .command`)[0].innerHTML;
                ChatVars.emoteToFind = ":" + ChatVars.text.split(":").pop();
                ChatVars.lastEmoteE = true;
                ChatVars.uPosition = ChatVars.text.indexOf(":", e.target.selectionStart);
                if (ChatVars.text.indexOf(":", -e.target.selectionStart) != -1) {
                    if (ChatVars.text.length == e.target.selectionStart) {
                        ChatVars.emoteToFind = ":" + ChatVars.text.split(":").pop().trim();
                    } else {
                        let [o1, o2] = Utility.splitStringAt(ChatVars.text, ChatVars.uPosition);
                        ChatVars.emoteToFind = ":" + o1.split(":").pop().trim();
                        ChatVars.lastEmoteE = false;
                    }
                }
                Chat.EmoteInputFinder();

            } else {
                $(`.${Classes.chatEmotePanel}`).hide();
            }
        });
    }

    static async EmoteInputFinder() {
        let suggestEmote = {};
        if (ChatVars.emoteToFind.length >= 3) {
            for (let entry in ChatEmotes) {
                if (entry.startsWith(`${ChatVars.emoteToFind}`)) {
                    suggestEmote[entry] = ChatEmotes[entry];
                }
            }
            if (Object.keys(suggestEmote).length > 0) {
                UI.Empty($(`.${Classes.chatEmotePanel}`));
                $.each(suggestEmote, function (key, value) {
                    let nEmote = key.replaceAll(":", "");
                    let emote = Elements.Build('emptyDivNoScroll', { cls: `emoteCorScale emote_${nEmote} choice ${Classes.chatSvelte}`, a: `data-emote="${nEmote}"`, html: ` <span><img class="emoteCorScale emoteImage" src="${value}" ></span>${key}` });
                    $(`.${Classes.chatEmotePanel}`).append(emote);
                    Input.DelegateClick($(`div[data-emote="${nEmote}"]`), $(`div[data-emote="${nEmote}"]`), function (e) {
                        let femote = $(e.currentTarget).attr("data-emote");
                        Chat.EmoteInputReplacer(femote);
                    });
                });

                $(`.${Classes.chatEmotePanel}`).find('.choice').first().addClass('active');

                $(`.${Classes.chatEmotePanel}`).show();
            } else {
                $(`.${Classes.chatEmotePanel}`).hide();
            }
        } else {
            $(`.${Classes.chatEmotePanel}`).hide();
        }
    }

    static async EmoteInputReplacer(femote) {
        if (!ChatVars.lastEmoteE) {
            let [p1, p2] = Utility.splitStringAt(ChatVars.text, ChatVars.uPosition);
            p1 = Utility.replaceLast(p1, `${ChatVars.emoteToFind}`, `:${femote}: `);
            ChatVars.text = p1 + p2;
        } else {
            ChatVars.text = Utility.replaceLast(ChatVars.text, `${ChatVars.emoteToFind}`, `:${femote}: `);
        }
        $(`#chatinput input.${Classes.chatSvelte}`).val(`${ChatVars.text}`).focus();
        $(`.${Classes.chatEmotePanel}`).hide();
        ChatVars = {};
    }

    static async ReloadedChat() {
        if (Settings.Get("enabledisableemote")) {
            Chat.EmoteSuggestor();
            Chat.EmoteTabSelect();
        }

        Chat.LoadActiveWhispers();
        Chat.WhisperWindows();
        $.each($(`.${Classes.chatClass}`).children(), function (key, node) {
            let type = Chat.GetType(node);
            let name = Chat.GetName(type, node);
            let textNode = $(node).find('.linewrap').children().last();
            let text = $(textNode).html();
            if (UI.Exist(name)) {
                if (UI.Exist(type)) {
                    if (!Player.IsBlocked(name)) {
                        let command = Chat.GetCommand(text);
                        if (command !== null) {
                            Chat.ApplyCommand(type, name, text, node, textNode, command);
                        }
                    } else {
                        $(node).hide();
                    }
                }
            }
            if (Settings.Get("enabledisableemote")) {
                Chat.CheckForEmotes(node);
            }
        });
    }

    static async AddCommand(identifier, data) {
        if (!ChatCommands.hasOwnProperty(identifier)) {
            ChatCommands[identifier] = data;
        }
    }

    static async RemoveCommand(identifier) {
        if (ChatCommands.hasOwnProperty(identifier)) {
            delete ChatCommands[identifier];
        }
    }

    static async DND(type, name, text, node) {
        if (!text.startsWith("<DND>") && Settings.Get("dndautorespons")) {
            Social.DoNotDisturb();
        }
    }

    static GetCommand(cmdIN) {
        let command = null;
        for (let entry in ChatCommands) {
            if (cmdIN.startsWith(entry) && command === null) {
                command = ChatCommands[entry];
            }
        }
        return command;
    }

    static async CheckForEmotes(node) {
        let textNode = node.childNodes[0].lastChild;
        let x = 1;
        if (UI.Exist(textNode)) {
            for (let entry in ChatEmotes) {
                if (textNode.innerHTML.includes(entry)) {
                    if (x > maxEmotes) {
                        break;
                    } else {
                        textNode.innerHTML = textNode.innerHTML.replaceAll(entry, `<img class="emoteCorScale" src="${ChatEmotes[entry]}" >`);
                        x++;
                    }
                }
            }
        }
    }

    static async ApplyCommand(type, name, text, node, textNode, command) {
        if (type == "wfrom") {
            if (command.hasOwnProperty("f") && command.f === null) {
                Chat.DND(type, name, text, node);
            } else {
                if (!command.hasOwnProperty("sec") || command.sec === null) {
                    command.f(type, name, text, textNode);
                } else {
                    if (command.sec == type) {
                        command.f(name, text, node);
                    }
                }
            }
        } else {
            if (!command.hasOwnProperty("sec") || command.sec === null) {
                command.f(type, name, text, textNode);
            } else {
                if (command.sec == type) {
                    command.f(name, text, node);
                }
            }
        }
    }

    static async Hook() {
        Mutator.Create("jschat", `.${Classes.chatClass}`, { childList: true, subtree: false, attributes: false, characterData: false }, function (mutations) {
            for (let mutation of mutations) {
                for (let node of mutation.addedNodes) {
                    let type = Chat.GetType(node);
                    let name = Chat.GetName(type, node);
                    let textNode = $(node).find('.linewrap').children().last();
                    let text = $(textNode).html();
                    if (UI.Exist(name)) {
                        if (UI.Exist(type)) {
                            if (!Player.IsBlocked(name)) {
                                let command = Chat.GetCommand(text);
                                if (command !== null) {
                                    Chat.ApplyCommand(type, name, text, node, textNode, command);
                                } else {
                                    if (type == "wfrom" || type == "wto") {
                                        Chat.LogWhisper(name, text, type);
                                        if (Settings.Get("whisperwindows")) {
                                            if(Settings.Get("hidewhisperonwindows")){
                                                $(node).hide();
                                            }
                                            //$(node).hide();
                                            Chat.WhisperWindowsProcess(name, text, type);
                                        }
                                    }
                                }
                                Chat.CheckForEmotes(node);
                            } else {
                                $(node).hide();
                            }
                        }
                    }
                }
            }
        });
    }

    static Trigger() {
        Input.KeyboardEvent(document.body, "keydown", { bubbles: true, cancelable: true, keyCode: 13 });
    }

    static async SendWhisper(name, message) {
        Chat.Trigger();
        let query = document.querySelector(`#${Classes.chatInput} input`);
        query.value = `/${name} ${message}`;
        Input.KeyboardEvent(query, "input", { bubbles: true, cancelable: true });
        Input.KeyboardEvent(query, "keydown", { bubbles: true, cancelable: true, keyCode: 13 });
    }

    static Send(message) {
        Chat.Trigger();
        let query = document.querySelector(`#${Classes.chatInput} input`);
        query.value = message;
        Input.KeyboardEvent(query, "input", { bubbles: true, cancelable: true });
        Input.KeyboardEvent(query, "keydown", { bubbles: true, cancelable: true, keyCode: 13 });
    }

    static Clear() {
        $("body").find(`.${Classes.chatClear}`).each(function () {
            UI.Remove(this);
        });
    }

    static GetName(type, node) {
        if (ChatData.data.public.includes(type) || ChatData.data.private.includes(type) || ChatData.data.ex.includes(type)) {
            return $(node).find('.name').html();
        } else {
            return null;
        }
    }

    static GetType(node) {
        for (let entry in ChatData.data.formatted) {
            let content = $(node).find('.content')[0];
            if (UI.Exist(content) && $(content).hasClass(ChatData.data.formatted[entry])) {
                return entry;
            }
        }
    }

    static async LogWhisper(name, message, type) {
        let time = Math.floor(Date.now() / 1000);
        if (!GlobalChatlog.hasOwnProperty(name)) {
            GlobalChatlog[name] = {};
        }
        GlobalChatlog[name][time] = { x: message, y: type };

        Storage.Set(MemKeys.ChatLog, JSON.stringify(GlobalChatlog));
    }
}