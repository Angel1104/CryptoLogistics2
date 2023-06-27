// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tracking {
    enum RamStatus { ENSAMBLADO, ENVIADO, COMPLETO, PROGRAMADO, PROBADO, EMPACADO }

    struct Ram {
        address sender;
        address receptor;
        uint256 fechaCreacion;
        uint256 fechaEnvio;
        uint256 ddr;
        uint256 precio;
        RamStatus status;
        bool isPaid;
        // uint256 fechaProgramado;
        // uint256 fechaPrueba;
        // uint256 fechaEmpaque;
        // uint256 fechaFinal;
        // uint256 capacidad;
        // uint256 fecuencia;
    }

    mapping(address => Ram[]) public rams;
    uint256 public ramCount;

     struct TypeRam {
        address sender;
        address receptor;
        uint256 fechaCreacion;
        uint256 fechaEnvio;
        uint256 ddr;
        uint256 precio;
        RamStatus status;
        bool isPaid;
        // uint256 fechaProgramado;
        // uint256 fechaPrueba;
        // uint256 fechaEmpaque;
        // uint256 fechaFinal;
        // uint256 capacidad;
        // uint256 fecuencia;
    }

    TypeRam[] typeRams;
    

    event RamCreated(address indexed sender, address indexed receptor, uint256 fechaCreacion, uint256 ddr, uint256 precio);
    event RamInTransit(address indexed sender, address indexed receptor, uint256 fechaCreacion);
    event RamDelivered(address indexed sender, address indexed receptor, uint256 fechaEnvio);
    event RamPaid(address indexed sender, address indexed receptor, uint256 amount);

    constructor() {
        ramCount = 0;
    }

     function createRam(address _receptor, uint256 _fechaCreacion, uint256 _ddr, uint256 _precio) public payable {
        require(msg.value == _precio, "Payment amount must match the precio.");
        
        Ram memory ram = Ram(msg.sender, _receptor, _fechaCreacion, 0, _ddr, _precio, RamStatus.ENSAMBLADO, false);

        rams[msg.sender].push(ram);
        ramCount++;

         typeRams.push(
            TypeRam(
                msg.sender, 
                _receptor, 
                _fechaCreacion, 
                0, 
                _ddr, 
                _precio, 
                RamStatus.ENSAMBLADO, 
                false
            )
        );
        
        emit RamCreated(msg.sender, _receptor, _fechaCreacion, _ddr, _precio);
    }

    function startRam(address _sender, address _receptor, uint256 _index) public {
        Ram storage ram = rams[_sender][_index];
        TypeRam storage typeRam = typeRams[_index];
        
        require(ram.receptor == _receptor, "Invalid receptor.");
        require(ram.status == RamStatus.ENSAMBLADO, "ram already in transit.");

        ram.status = RamStatus.ENVIADO;
        typeRam.status = RamStatus.ENVIADO;

        emit RamInTransit(_sender, _receptor, ram.fechaCreacion);
    }

    function completeRam(address _sender, address _receptor, uint256 _index) public {
        Ram storage ram = rams[_sender][_index];
        TypeRam storage typeRam = typeRams[_index];

        require(ram.receptor == _receptor, "Invalid receptor.");
        require(ram.status == RamStatus.ENVIADO, "ram not in transit.");
        require(!ram.isPaid, "ram already paid.");

         ram.status = RamStatus.COMPLETO;
         typeRam.status = RamStatus.COMPLETO;
         typeRam.fechaEnvio = block.timestamp;
         ram.fechaEnvio = block.timestamp;

        uint256 amount = ram.precio;

        payable(ram.sender).transfer(amount);

        ram.isPaid = true;
        typeRam.isPaid = true;

        emit RamDelivered(_sender, _receptor, ram.fechaEnvio);
        emit RamPaid(_sender, _receptor, amount);
    }

    function getRam(address _sender, uint256 _index) public view returns (address, address, uint256, uint256, uint256, uint256, RamStatus, bool) {
        Ram memory ram = rams[_sender][_index];
        return (ram.sender, ram.receptor, ram.fechaCreacion, ram.fechaEnvio, ram.ddr, ram.precio, ram.status, ram.isPaid);
    }

    function getRamsCount(address _sender) public view returns (uint256) {
        return rams[_sender].length;
    }

     function getAllTransactions()
        public
        view
        returns (TypeRam[] memory)
    
    {
        return typeRams;
    }

   
}
