

declare module "SitePlugin" {

  export type Meta = {
    name: string
    siteKey: string
    siteKeySub?: string[]
  }


  export type UrlType = "site" | "board" | "thread" | "res" | "error" | "siki"
  export type UrlObject = {
    type: UrlType
    sitename?: string
    server?: string
    board?: string
    threadkey?: string
    ssl?: boolean
    location?: string
    pane?: string
    an?: number
    seq?: string
    range?: [number, number]
    hash?: string
    _org?: string
    _dir?: string
    title?: string
    path?: string
    filesystem?: boolean
    follow_redirect?: boolean
    cmd?: string
  }

  export type UrlString = string
  export type SetResState = {
    type: 'an' | 'myself'
    an: number
    level: number
    wflag: number
    star?: number
    md5digest?: string
  }
  export type UrlReg = [RegExp, (m: string[]) => Promise<UrlObject>]
  export interface ResData {
    an: number
    num?: number
    seq?: string
    body?: string
    title?: string
    location?: string
    mname?: string
    sname?: string
    namecolor?: string
    nickname?: string
    id?: string
    id2?: string
    id_verbose?: string
    mail?: string
    timestamp?: number
    ip?: string
    host?: string
    br?: number,
    digest?: string,
    anchor_an?: Set<number>
    anc?: Array<number>
    ancfrom?: Array<number>
    md5digest?: string
    aa?: boolean
    story?: Record<number, number>
    mark?: number
    mark_star?: number
    vflag?: number
    wflag?: number
    fweight?: number
    flabel?: string
    fid?: string
    bbsslip?: string
    dup1?: number
    dup2?: number
    good?: number
    bad?: number
    r18g?: boolean
    r18g_warn?: boolean
    icon_url?: string
    publisher?: string
    movies?: string[]
    images?: string[]
    inner_link?: string[]
    outer_link?: string[]
    thread_stop?: boolean
  }
  interface ThreadData {
    __version?: string
    title: string
    br_array: Array<number>
    line_metrix: Array<Array<number>>
    location: string
    thread_array?: Array<ResData>
    i_collection?: Record<string, Record<string, Record<string, Array<number>>>>
    filter_count?: Record<string, number>
    speed?: number
    deltaspeed?: number
    newly_read?: number
    source?: string
    source_url?: string
    headers?: Record<string, string>
    fetchtime?: number
    datalength?: number
    original_body_size?: number
    status?: number
    responsetime?: number
    analyzetime?: number
    loaded_page?: number
    statusCode?: number
    prev_read?: number
    current_read?: number
    publisher?: string
    tags?: string[]
    i_story?: Record<string, number[]>
    normalized?: string
    title_format?: string
    part_est?: number
    bbsslip?: string
    open_ip?: boolean
    established?: number
    meta?: Record<string, string | number>
    //setResState?: {myres: SetResState[], an: SetResState[]}
    setMark?: SetResState[]
    dc1?: Record<string, Set<number>>
    dc2?: Record<string, Set<number>>
    multipage_bottom?: number
    next_thread?: Record<string, any>
    maxres?: number
    error_html?: string
    datify_error?: boolean
  }

  type BoardData = {
    an?: number
    i?: number
    resnum?: number
    resint?: number
    title?: string
    publisher?: string
    location?: string
    threadkey?: string
    incres?: number
    delta?: number
    readonly?: boolean
    pubdate?: number
    speed?: number
    lastres?: number
    lastmodify?: number
    st?: number
    cr?: number
    already?: number
    bookmark?: number
    star?: number
    vflag?: number
    fweight?: number
    flabel?: string
    mute?: boolean
    pri?: number
    archived?: number
    nonpri?: number
    bbsslip?: string
    pmt?: string
  }

  export type GPBCResponse = {
    body: string
    statusCode?: number
    responsetime?: number
    fetchtime?: number
    headers?: Record<string, string>
    source_url?: string
    href?: string
    datalength?: number
    original_body_size?: number
    additional?: Record<string, string | number>
    error?: string
    range_request_mode?: boolean
    range_request_check?: string
  }

  export type IsError = {
    success: boolean
    confirm?: boolean
    error?: string
    reload_wait?: number
    body?: string
    headers?: Record<string, string>
    detector?: {
      message: string
      resnum?: string
    }
    sec?: number
  }

  export interface SiteOptions {
    // site

    /**
     * ログインURLのリスト
     */
    login_url?: {
      label: string
      login_check?: {
        cookie_key: string
        cookie_value: RegExp
      }
      url: UrlString
    }[]

    /**
     * 強制的にSSLとして扱う
     * @default true
     */
    force_ssl?: boolean

    /**
     * リダイレクトされたURLをフォローする
     */
    follow_redirect?: boolean

    /**
     * サイトの文字エンコーディング
     */
    encoding?: string

    /**
     * 投稿時の文字エンコーディング
     */
    post_encoding?: string

    /**
     * 無視するサーバー名のリスト
     */
    ignore_server?: string[]

    /**
     * 無視する板名のリスト
     */
    ignore_board?: string[]

    /**
     * 板のDSVヘッダのリスト
     */
    dsv_board_header?: string[]
    dsv_board_delimiter?: string
    board_load_atonce?: number
    board_multi_page?: boolean
    archivable?: boolean
    leave_past?: boolean
    board_cutoff?: number
    // board_capacity?: number
    board_no_residue?: boolean
    subject_source?: string
    //board_streaming?: false
    allow_null?: boolean
    //thread
    /**
     * スレッドのDSVヘッダのリスト
     */
    dsv_thread_header?: string[]
    dsv_thread_delimiter?: string
    collection_fields?: string[]
    postable_res?: boolean
    postable_thread?: boolean
    /**
     * 引用レスをアンカーとして認知させる
     */
    quot_anchor?: boolean

    /**
     * シーケンス番号をアンカーとして認知させるをアンカーとして認知させる
     */
    num_anchor?: boolean
    /**
     * 最初のレスの通し番号
     */
    seq_anchor?: boolean
    /**
     * 
     */
    num_offset?: number
    /**
     * bbsslip/
     */
    bbsslip?: boolean

    /**
     * 1ページのレス数
     */
    page_per?: number

    /**
     * スレッドの最大レス数
     */
    readonly_num?: number

    /**
     * スレッドに期限があるかどうか
     */
    thread_expired?: Record<string, number>

    r18g_anchor?: boolean
    r18g_reg?: string
    anchor_fobidden?: number
    popular_sh?: number

    multi_page?: boolean

    /**
     * upvote を使う
     */
    upvote?: boolean
    /**
     * downvote を使う
     */
    downvote?: boolean

    /**
     * discord形式markup
     */
    discord_mark?: boolean
    /**
     * Partial Content　によるスレッド取得
     */
    dat_partial_mode?: boolean
    unset_partial_mode?: boolean

    image_replacer_enable?: boolean
    cookie_ignore_key?: string[]
    image_uploadable?: boolean
    drawing_size?: string

    dropmode?: boolean

    /**
     * データが無いときのメッセージ
     */
    no_length_message?: string | void
  }

  export type RequestHeaders = Record<string, string>

  export type Workspace = {
    workspaceid: number
    write_useragent: string
    read_useragent: string
  }
  export interface CommonDef {
    uo?: UrlObject
    site_option?: Record<string, string>
  }

  export interface SiteDef extends CommonDef {

    initialize?: (gpbc) => void
    /**
     * URLを作成
     * @param uo Urlオブジェクト
     * @param settype 返すURLの種類
     */
    urlize?: (uo: UrlObject, settype?: UrlType) => UrlString

    /**
     * URLから板やスレッドへのマッピングを行う為の正規表現リスト
     */
    uo_regexp?: () => UrlReg[]

    /**
     * URLのリダイレクト
     */
    redirect?: (uo: UrlObject, workspaceid?: number, force?: boolean) => Promise<UrlObject>
    /**
     * サイトのログを保存するためのディレクトリ
     * @return ディレクトリ
     */
    site_dir?: () => string

    /**
     * faviconのURL
     */
    favicon_url?: () => Promise<UrlString | void>

    /**
     * robots.txtのURL
     */
    robots_url?: () => Promise<UrlString | void>

    /**
     * サイトのメタ情報
     */
    config_meta?: () => Promise<Record<string, any>>

    //site_files_update?: (renew?: boolean) => void
    //resolve_url?: (url: UrlString, as?: UrlType) => UrlObject
    //redirect?: (uo: UrlObject, workspace: Workspace) => Promise<UrlString>
    make_escaped_query?: (q: Record<string, string>, encoding: string, unicode_through?: boolean, headers?: Record<string, string>, option?: { unicode_through?: boolean, query_order?: string[] }) => string
  }

  export interface BoardDef extends CommonDef {
    /**
     * 板のログを保存するためのディレクトリ
     * @return ディレクトリ
     */
    subject_dir?: () => string

    /**
     * スレッド一覧を取得するためのURL
     */
    subject_url?: (page: number) => UrlString

    /**
     * 板の設定を得るためのURL
     */
    setting_url?: () => UrlString

    /**
     * 板ヘッダのキーリスト
     */
    board_headers?: () => string[]

    /**
     * スレッド一覧をサーバーから取得した結果のレスポンスを得る
     */
    fetch_subject?: (boardStructure: any, workspace: Workspace, cmd: string | void, page: number) => Promise<GPBCResponse | GPBCResponse[]>

    /**
     * レスポンスからスレッド一覧のDSVへ変換
     */
    adjust_subject?: (raw: string) => string

    /**
     * 板の設定を変換
     */
    adjust_setting?: (raw: string) => string

    /**
     * 板設定をサーバーから取得した結果のレスポンスを得る
     */
    fetch_setting?: (workspace?: Workspace) => Promise<GPBCResponse>

    /**
     * レスデータ処理
     */
    processor_ex?: () => Record<string, (data: BoardData, c: string, i: number) => void>

    after_initialize?: () => void
    after_processor?: (data: BoardData) => void
    before_get_subject?: (workspace: Workspace) => void
    after_get_subject?: (workspace: Workspace) => void
    load_page_atonce?: () => number
    request_url?: (url: string, site_option: Record<string, any>, headers: Headers, session_option: any) => Promise<GPBCResponse>
    alt_ua?: () => string
  }

  export interface ThreadDef extends CommonDef {
    /**
     * スレッドを取得するためのURL
     */
    thread_url?: (page: number) => UrlString

    fetch_thread?: (oldres: ThreadData, page: number, workspace: Workspace) => Promise<GPBCResponse>

    file_loaded?: (res: ThreadData) => Promise<void>

    /**
     * レスポンスからスレッドのDSVへ変換
     */
    datify?: (raw: string, idx_offset?: number) => string

    thread_dir?: () => string

    /**
     * レスデータ処理
     */
    processor_ex?: () => Record<string, (data: ResData, c: string, i: number) => void>

    after_parse?: (data: ResData) => void

    regexp_ex?: () => Record<string, RegExp>

    shaping_body_hook?: (body: string, data: ResData, i: number) => string

    num_anchor_an?: (n: number) => number

    multipage_bottom?: (old: any, page: number, workspace: any, res: GPBCResponse) => Promise<number>

    page_per?: () => number

    calc_idx_offset?: (n: number) => number
    calc_page_loaded?: (n: number, bottom: number) => number

    dateParse?: (text: string, formatStr: string, ref?: Date | number) => Date
    dateParseISO?: (text: string) => Date
    dateFormat?: (date: Date | number, formatStr: string, opts: Record<string, boolean>, locale_str?: string) => string
    request?: (url: string, site_option: Record<string, any>, headers: Headers, session_option: any) => Promise<GPBCResponse>

    set_meta_structure?: (k: string, v: any) => void
    get_meta_structure?: (k: string) => any

    data?: any

  }

  export interface PostDef extends CommonDef {
    target_url?: () => string
    referer_url?: () => string
    post_request?: (query: Record<string, string>, workspace: Workspace, headers: Headers, target_url: string) => Promise<GPBCResponse>,
    get_query?: (q: Record<string, string>, opts?: Record<string, any>) => Promise<Record<string, string>>
    //error_capture?: (res: GPBCResponse, query: Record<string, string>) => 

    form_trans?: (o: Record<string, string>) => Record<string, string>
    append_header?: (headers: Record<string, string>) => Record<string, string>
    anchor_format?: (an: number) => string
    headers?: any
    get_query_thread?: any
    error_capture?: any
    post_vote?: any

  }
}
