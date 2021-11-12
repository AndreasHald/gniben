// All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
interface AriaAttributes {
    /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
    'aria-activedescendant'?: string | undefined;
    /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
    'aria-atomic'?: boolean | 'false' | 'true' | undefined;
    /**
     * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
     * presented if they are made.
     */
    'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both' | undefined;
    /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
    'aria-busy'?: boolean | 'false' | 'true' | undefined;
    /**
     * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
     * @see aria-pressed @see aria-selected.
     */
    'aria-checked'?: boolean | 'false' | 'mixed' | 'true' | undefined;
    /**
     * Defines the total number of columns in a table, grid, or treegrid.
     * @see aria-colindex.
     */
    'aria-colcount'?: number | undefined;
    /**
     * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
     * @see aria-colcount @see aria-colspan.
     */
    'aria-colindex'?: number | undefined;
    /**
     * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-colindex @see aria-rowspan.
     */
    'aria-colspan'?: number | undefined;
    /**
     * Identifies the element (or elements) whose contents or presence are controlled by the current element.
     * @see aria-owns.
     */
    'aria-controls'?: string | undefined;
    /** Indicates the element that represents the current item within a container or set of related elements. */
    'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time' | undefined;
    /**
     * Identifies the element (or elements) that describes the object.
     * @see aria-labelledby
     */
    'aria-describedby'?: string | undefined;
    /**
     * Identifies the element that provides a detailed, extended description for the object.
     * @see aria-describedby.
     */
    'aria-details'?: string | undefined;
    /**
     * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
     * @see aria-hidden @see aria-readonly.
     */
    'aria-disabled'?: boolean | 'false' | 'true' | undefined;
    /**
     * Indicates what functions can be performed when a dragged object is released on the drop target.
     * @deprecated in ARIA 1.1
     */
    'aria-dropeffect'?: 'none' | 'copy' | 'execute' | 'link' | 'move' | 'popup' | undefined;
    /**
     * Identifies the element that provides an error message for the object.
     * @see aria-invalid @see aria-describedby.
     */
    'aria-errormessage'?: string | undefined;
    /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
    'aria-expanded'?: boolean | 'false' | 'true' | undefined;
    /**
     * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
     * allows assistive technology to override the general default of reading in document source order.
     */
    'aria-flowto'?: string | undefined;
    /**
     * Indicates an element's "grabbed" state in a drag-and-drop operation.
     * @deprecated in ARIA 1.1
     */
    'aria-grabbed'?: boolean | 'false' | 'true' | undefined;
    /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
    'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | undefined;
    /**
     * Indicates whether the element is exposed to an accessibility API.
     * @see aria-disabled.
     */
    'aria-hidden'?: boolean | 'false' | 'true' | undefined;
    /**
     * Indicates the entered value does not conform to the format expected by the application.
     * @see aria-errormessage.
     */
    'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling' | undefined;
    /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
    'aria-keyshortcuts'?: string | undefined;
    /**
     * Defines a string value that labels the current element.
     * @see aria-labelledby.
     */
    'aria-label'?: string | undefined;
    /**
     * Identifies the element (or elements) that labels the current element.
     * @see aria-describedby.
     */
    'aria-labelledby'?: string | undefined;
    /** Defines the hierarchical level of an element within a structure. */
    'aria-level'?: number | undefined;
    /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
    'aria-live'?: 'off' | 'assertive' | 'polite' | undefined;
    /** Indicates whether an element is modal when displayed. */
    'aria-modal'?: boolean | 'false' | 'true' | undefined;
    /** Indicates whether a text box accepts multiple lines of input or only a single line. */
    'aria-multiline'?: boolean | 'false' | 'true' | undefined;
    /** Indicates that the user may select more than one item from the current selectable descendants. */
    'aria-multiselectable'?: boolean | 'false' | 'true' | undefined;
    /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
    'aria-orientation'?: 'horizontal' | 'vertical' | undefined;
    /**
     * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
     * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
     * @see aria-controls.
     */
    'aria-owns'?: string | undefined;
    /**
     * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
     * A hint could be a sample value or a brief description of the expected format.
     */
    'aria-placeholder'?: string | undefined;
    /**
     * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     * @see aria-setsize.
     */
    'aria-posinset'?: number | undefined;
    /**
     * Indicates the current "pressed" state of toggle buttons.
     * @see aria-checked @see aria-selected.
     */
    'aria-pressed'?: boolean | 'false' | 'mixed' | 'true' | undefined;
    /**
     * Indicates that the element is not editable, but is otherwise operable.
     * @see aria-disabled.
     */
    'aria-readonly'?: boolean | 'false' | 'true' | undefined;
    /**
     * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
     * @see aria-atomic.
     */
    'aria-relevant'?: 'additions' | 'additions removals' | 'additions text' | 'all' | 'removals' | 'removals additions' | 'removals text' | 'text' | 'text additions' | 'text removals' | undefined;
    /** Indicates that user input is required on the element before a form may be submitted. */
    'aria-required'?: boolean | 'false' | 'true' | undefined;
    /** Defines a human-readable, author-localized description for the role of an element. */
    'aria-roledescription'?: string | undefined;
    /**
     * Defines the total number of rows in a table, grid, or treegrid.
     * @see aria-rowindex.
     */
    'aria-rowcount'?: number | undefined;
    /**
     * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
     * @see aria-rowcount @see aria-rowspan.
     */
    'aria-rowindex'?: number | undefined;
    /**
     * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
     * @see aria-rowindex @see aria-colspan.
     */
    'aria-rowspan'?: number | undefined;
    /**
     * Indicates the current "selected" state of various widgets.
     * @see aria-checked @see aria-pressed.
     */
    'aria-selected'?: boolean | 'false' | 'true' | undefined;
    /**
     * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
     * @see aria-posinset.
     */
    'aria-setsize'?: number | undefined;
    /** Indicates if items in a table or grid are sorted in ascending or descending order. */
    'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other' | undefined;
    /** Defines the maximum allowed value for a range widget. */
    'aria-valuemax'?: number | undefined;
    /** Defines the minimum allowed value for a range widget. */
    'aria-valuemin'?: number | undefined;
    /**
     * Defines the current value for a range widget.
     * @see aria-valuetext.
     */
    'aria-valuenow'?: number | undefined;
    /** Defines the human readable text alternative of aria-valuenow for a range widget. */
    'aria-valuetext'?: string | undefined;
}

export interface HTMLAttributes extends AriaAttributes {
    // Standard HTML Attributes
    class?: string | undefined;
    dataset?: object | undefined; // eslint-disable-line
    accept?: string | undefined;
    acceptcharset?: string | undefined;
    accesskey?: string | undefined;
    action?: string | undefined;
    allow?: string | undefined;
    allowfullscreen?: boolean | undefined;
    allowtransparency?: boolean | undefined;
    allowpaymentrequest?: boolean | undefined;
    alt?: string | undefined;
    as?: string | undefined;
    async?: boolean | undefined;
    autocomplete?: string | undefined;
    autofocus?: boolean | undefined;
    autoplay?: boolean | undefined;
    capture?: 'environment' | 'user' | boolean | undefined;
    cellpadding?: number | string | undefined;
    cellspacing?: number | string | undefined;
    charset?: string | undefined;
    challenge?: string | undefined;
    checked?: boolean | undefined;
    cite?: string | undefined;
    classid?: string | undefined;
    cols?: number | undefined;
    colspan?: number | undefined;
    content?: string | undefined;
    contenteditable?: 'true' | 'false' | boolean | undefined;

    // Doesn't work when used as HTML attribute
    /**
     * Elements with the contenteditable attribute support innerHTML and textContent bindings.
     */
    innerHTML?: string | undefined;
    // Doesn't work when used as HTML attribute
    /**
     * Elements with the contenteditable attribute support innerHTML and textContent bindings.
     */

    textContent?: string | undefined;

    contextmenu?: string | undefined;
    controls?: boolean | undefined;
    coords?: string | undefined;
    crossorigin?: string | undefined;
    currenttime?: number | undefined;
    decoding?: 'async' | 'sync' | 'auto' | undefined;
    data?: string | undefined;
    datetime?: string | undefined;
    default?: boolean | undefined;
    defaultmuted?: boolean | undefined;
    defaultplaybackrate?: number | undefined;
    defer?: boolean | undefined;
    dir?: string | undefined;
    dirname?: string | undefined;
    disabled?: boolean | undefined;
    download?: any | undefined;
    draggable?: boolean | 'true' | 'false' | undefined;
    enctype?: string | undefined;
    for?: string | undefined;
    form?: string | undefined;
    formaction?: string | undefined;
    formenctype?: string | undefined;
    formmethod?: string | undefined;
    formnovalidate?: boolean | undefined;
    formtarget?: string | undefined;
    frameborder?: number | string | undefined;
    headers?: string | undefined;
    height?: number | string | undefined;
    hidden?: boolean | undefined;
    high?: number | undefined;
    href?: string | undefined;
    hreflang?: string | undefined;
    htmlfor?: string | undefined;
    httpequiv?: string | undefined;
    id?: string | undefined;
    inputmode?: string | undefined;
    integrity?: string | undefined;
    is?: string | undefined;
    ismap?: boolean | undefined;
    keyparams?: string | undefined;
    keytype?: string | undefined;
    kind?: string | undefined;
    label?: string | undefined;
    lang?: string | undefined;
    list?: string | undefined;
    loading?: string | undefined;
    loop?: boolean | undefined;
    low?: number | undefined;
    manifest?: string | undefined;
    marginheight?: number | undefined;
    marginwidth?: number | undefined;
    max?: number | string | undefined;
    maxlength?: number | undefined;
    media?: string | undefined;
    mediagroup?: string | undefined;
    method?: string | undefined;
    min?: number | string | undefined;
    minlength?: number | undefined;
    multiple?: boolean | undefined;
    muted?: boolean | undefined;
    name?: string | undefined;
    nonce?: string | undefined;
    novalidate?: boolean | undefined;
    open?: boolean | undefined;
    optimum?: number | undefined;
    part?: string | undefined;
    pattern?: string | undefined;
    placeholder?: string | undefined;
    playsinline?: boolean | undefined;
    poster?: string | undefined;
    preload?: string | undefined;
    radiogroup?: string | undefined;
    readonly?: boolean | undefined;
    referrerpolicy?: string | undefined;
    rel?: string | undefined;
    required?: boolean | undefined;
    reversed?: boolean | undefined;
    role?: string | undefined;
    rows?: number | undefined;
    rowspan?: number | undefined;
    sandbox?: string | undefined;
    scope?: string | undefined;
    scoped?: boolean | undefined;
    scrolling?: string | undefined;
    seamless?: boolean | undefined;
    selected?: boolean | undefined;
    shape?: string | undefined;
    size?: number | undefined;
    sizes?: string | undefined;
    slot?: string | undefined;
    span?: number | undefined;
    spellcheck?: boolean | 'true' | 'false' | undefined;
    src?: string | undefined;
    srcdoc?: string | undefined;
    srclang?: string | undefined;
    srcset?: string | undefined;
    start?: number | undefined;
    step?: number | string | undefined;
    style?: string | undefined;
    summary?: string | undefined;
    tabindex?: number | undefined;
    target?: string | undefined;
    title?: string | undefined;
    type?: string | undefined;
    usemap?: string | undefined;
    value?: string | string[] | number | null | undefined;
    /**
     * a value between 0 and 1
    */
    volume?: number | undefined;
    width?: number | string | undefined;
    wmode?: string | undefined;
    wrap?: string | undefined;

    // RDFa Attributes
    about?: string | undefined;
    datatype?: string | undefined;
    inlist?: any | undefined;
    prefix?: string | undefined;
    property?: string | undefined;
    resource?: string | undefined;
    typeof?: string | undefined;
    vocab?: string | undefined;

    // Non-standard Attributes
    autocapitalize?: string | undefined;
    autocorrect?: string | undefined;
    autosave?: string | undefined;
    color?: string | undefined;
    itemprop?: string | undefined;
    itemscope?: boolean | undefined;
    itemtype?: string | undefined;
    itemid?: string | undefined;
    itemref?: string | undefined;
    results?: number | undefined;
    security?: string | undefined;
    unselectable?: boolean | undefined;
    [key: `data-${string}`]: string;
}
