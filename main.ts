import * as peg from 'pegjs'


const parser = peg.generate(`
    Expression = "{" _ setup:Setup _ "|" _ value:Value _ "}" {
        return {
            setup: setup,
            value: value
        }
    }

    Setup = _ (id:Identificator _ "=" _ val:Const _ ) setupList:(", " _ id:Identificator _ "=" _ val:Const _)* _ { 
        return setupList.map(function(x) {
            return {id: x.id, val: x.val};
        })
    }

    Value = _ (c:Const / v:Identificator) _ "+" _ (c2:Const / v2:Identificator) _
    
    Const = [0-9]+

    Identificator = [A-Za-z]+

    _ = [ \\t\\n\\r]*
`)

console.log(
    parser.parse(`[a = 1, b = 2 | a + b]`)
)