enum RolesEnum {
    ADMIN = 'ADM',
    JUGADOR = 'JUG',
    SEO = 'SEO'
}

enum EstadoEnum {
    ACTIVO = 'A',
    ELIMINADO = 'D',
    PROCESADO = 'P',
}

enum TipoGrupoEnum {
    SIMPLE = 'S',
    MULTIPLE = 'M',
}

enum TipoPrivacidadEnum {
    ABIERTO = 'A',
    PRIVADO = 'P'
}

enum TypeKeyParamEnum {
    OBJECT_ID = 'objectId',
    PK_ORACLE = 'primaryKey',
    PAGE = 'pagina',
    LIMIT = 'limite',
    USER = 'usuario',
    PASSWORD = 'password',
    PARAM_BUSQUEDA = 'busqueda',
    TIPO_TAREA = 'Tipo tarea',
    DATETIME = 'Fecha y Hora',
    DATE = 'Fecha',
}

export  {TypeKeyParamEnum,RolesEnum, EstadoEnum}