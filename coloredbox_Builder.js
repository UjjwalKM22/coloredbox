(function() {
    let template = document.createElement("template");
    template.innerHTML = `
        <form id="form">
            <fieldset>
                <legend>Colored Box Properties</legend>
                <table>
                    <tr>
                        <td>Opacity</td>
                        <td><input id="builder_opacity" type="number" step="0.1" min="0" max="1" size="5"></td>
                    </tr>
                </table>
                <input type="submit" style="display:none;">
            </fieldset>
        </form>
    `;

    class ColoredBoxBuilderPanel extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({mode: "open"});
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
        }

        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: {
                        opacity: this.opacity
                    }
                }
            }));
        }

        set opacity(newOpacity) {
            this._shadowRoot.getElementById("builder_opacity").value = newOpacity;
        }

        get opacity() {
            return this._shadowRoot.getElementById("builder_opacity").value;
        }
    }

    customElements.define("com-sap-sample-coloredbox-builder", ColoredBoxBuilderPanel);
})();
