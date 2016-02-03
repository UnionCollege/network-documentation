var Schema = {
  panel_ports: {
    id: {type: 'increments', nullable: false, primary: true},
    port: {type: 'string', maxlength: 3, nullable: false},
    destination: {type: 'string', maxlength: 15, nullable: true}
  },
  node_panel: {
    id: {type: 'increments', nullable: false, primary: true},
    node: {type: 'string', maxlength: 2, nullable: false},
    panel: {type: 'string', maxlength: 2, nullable: false},
    panel_id: {type: 'integer', nullable: false}
  },
  switch_ports: {
    id: {type: 'increments', nullable: false, primary: true},
    panel: {type: 'integer', nullable: false},
    switch: {type: 'integer', nullable: false},
    switch_port: {type: 'string', maxlength: 5, nullable: true}
  },
  switch_details: {
    id: {type: 'increments', nullable: false, primary: true},
    panel: {type: 'string', maxlength: 10, nullable: true},
    switch: {type: 'string', maxlength: 16, nullable: true},
    switch_port: {type: 'string', maxlength: 16, nullable: true}
  },
  alpha: {
    letter: {type: 'string', maxlength: 1, nullable: false, primary: true},
    phonetic: {type: 'string', maxlength: 15, nullable: false}
  },
  access_points: {
    name: {type: 'string', maxlength: 30, nullable: false, primary: true},
    mac: {type: 'string', maxlength: 16, nullable: false}
  }
}

module.exports = Schema
